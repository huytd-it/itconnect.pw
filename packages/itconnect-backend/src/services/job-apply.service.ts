import {ConflictException, ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {JobApplyCreateInputDto, JobApplySearchInputDto, JobApplyStatisticOption} from "../dtos/jobApply.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {JobApplyEntity, JobApplyStatus} from "../entities/jobApply.entity";
import {LessThanOrEqual, MoreThanOrEqual, Repository} from "typeorm";
import {
    fillAllDate,
    getFormatDateGroupBy,
    PageDto,
    PageMetaDto,
    PageOptionsDto,
    StatisticGroupBy
} from "../dtos/page.dto";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {Id} from "../utils/function";
import {JobEntity} from "../entities/job.entity";
import * as moment from "moment";
import {AppRole} from "../polices/permission.enum";

@Injectable({ scope: Scope.REQUEST })
export class JobApplyService {
    constructor(
        @InjectRepository(JobApplyEntity)
        private jobApplyRepository: Repository<JobApplyEntity>,
        @InjectRepository(JobEntity)
        private jobRepository: Repository<JobEntity>,
        @Inject(REQUEST) private request: Request
    ) {
    }

    get user() {
        return this.request['user'] as UserEntity;
    }

    owner(jobId: number) {
        return this.jobApplyRepository.findOne({
            where: {
                id: jobId,
                user: Id(this.user.id)
            }
        })
    }

    async search(search: JobApplySearchInputDto, page: PageOptionsDto) {
        const qr = this.jobApplyRepository.createQueryBuilder('jobApply');
        qr.innerJoinAndSelect('jobApply.job', 'job');

        // check company post exists and not banned
        qr.innerJoinAndSelect('job.user', 'userV2', `userV2.role <> :prm_role`, {
            prm_role: AppRole.ban
        });

        qr.leftJoinAndSelect('job.addressProvince', 'addressProvince');
        qr.leftJoinAndSelect('job.addressDistrict', 'addressDistrict');
        qr.leftJoinAndSelect('job.addressVillage', 'addressVillage');
        qr.leftJoinAndSelect('job.companyTag', 'companyTag');
        qr.leftJoinAndSelect('companyTag.companyInfo', 'companyInfo');
        qr.leftJoinAndSelect('companyInfo.avatar', 'avatar');
        qr.leftJoinAndSelect('companyInfo.banner', 'banner');
        qr.loadRelationCountAndMap('job.jobApplyCount', 'job.jobApply', 'jobApplyCount')
        qr.loadRelationCountAndMap(
            'job.jobApplySelf',
            'job.jobApply',
            'jobApplySelf',
            (qr) => qr.where({
                user: Id(this.user.id)
            })
        )
        qr.loadRelationCountAndMap(
            'job.jobSavedSelf',
            'job.jobSaved',
            'jobSavedSelf',
            (qr) => qr.where({
                user: Id(this.user.id)
            })
        )

        if (this.user.role === AppRole.company) {
            qr.innerJoinAndSelect('jobApply.user', 'user', 'user.role <> :prm_role', { prm_role: AppRole.ban });
            qr.leftJoinAndSelect('user.userInfo', 'userInfo');
            qr.leftJoinAndSelect('userInfo.addressProvince', 'addressProvinceUI');
            qr.leftJoinAndSelect('userInfo.addressDistrict', 'addressDistrictUI');
            qr.leftJoinAndSelect('userInfo.addressVillage', 'addressVillageUI');
            qr.leftJoinAndSelect('userInfo.avatar', 'avatarUV');
            qr.leftJoinAndSelect('userInfo.banner', 'bannerUV');
            qr.leftJoinAndSelect(
                'user.cvWorkExperienceCurrents',
                'cvWorkExperienceCurrents',
                'cvWorkExperienceCurrents.endDate is null'
            )
            qr.leftJoinAndSelect('cvWorkExperienceCurrents.companyTag', 'companyTagUV')
        } else if (this.user.role === AppRole.user) {
            qr.andWhere({
                user: Id(this.user.id)
            })
        }

        if (search.jobId) {
            qr.andWhere({
                job: Id(search.jobId)
            })
        } else {
            if (this.user.role === AppRole.company) {
                qr.andWhere({
                    job: {
                        user: this.user.id
                    }
                })
            }
        }

        if (search.search) {
            let whereClause = '(job.name like :param_search)';
            if (this.user.role === AppRole.company) {
                whereClause += ' or (userInfo.fullName like :param_search)';
            }
            qr.andWhere(`(${whereClause})`, {
                'param_search': `%${search.search}%`
            });
        }

        if (page.order && page.order_field) {
            qr.orderBy(page.order_field, page.order)
        }

        // count all data
        const total = await qr.getCount();

        // query data
        qr.skip(page.skip);
        qr.take(page.take);
        const result = await qr.getMany();

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: page });
        return new PageDto(result, meta)
    }

    async create(data: JobApplyCreateInputDto) {
        if (data.id) {
            const jobApply = await this.jobApplyRepository.findOne({
                where: [
                    {
                        id: data.id,
                        user: Id(this.user.id)
                    },
                    {
                        id: data.id,
                        job: {
                            user: Id(this.user.id)
                        }
                    },
                ],
                loadRelationIds: true
            })
            if (!jobApply) {
                throw new ForbiddenException();
            }

            // forbidden when call request join by user
            if (this.user.role === AppRole.user && data.status === JobApplyStatus.RequestJoin) {
                throw new ForbiddenException();
            }
            await this.jobApplyRepository.update({ id: data.id }, {
                status: data.status
            })

            // check update status job
            // ---------- need update ----------

            // get
            return await this.jobApplyRepository.findOne({
                where: {
                    id: data.id
                },
                loadRelationIds: true
            })
        } else {
            // check is apply
            const jobApply = await this.jobApplyRepository.findOne({
                where: {
                    user: Id(this.user.id),
                    job: Id(data.jobId)
                }
            })
            if (jobApply) {
                throw new ConflictException('Bạn đã apply rồi')
            }
            // check job is accept apply
            const job = await this.jobRepository.findOne({
                where: {
                    id: data.jobId,
                    endDate: MoreThanOrEqual(moment().toDate())
                }
            })
            if (!job) {
                throw new ForbiddenException();
            }

            // apply
            return this.jobApplyRepository.save([
                {
                    user: Id(this.user.id),
                    job: Id(data.jobId),
                }
            ])
        }
    }

    async delete(id: number) {
        // only user owner
        const owner = await this.owner(id);
        if (owner) {
            return this.jobApplyRepository.remove(owner);
        }

        throw new ForbiddenException()
    }

    async sts(query: JobApplyStatisticOption) {
        const qrView = this.jobApplyRepository.createQueryBuilder('ja');
        qrView.select(`
            DATE_FORMAT(ja.createdAt,:prm_group) legend,
            COUNT(*) countApply
        `);
        qrView.setParameter('prm_group', getFormatDateGroupBy(query.group));
        qrView.groupBy('legend')
        qrView.orderBy('ja.createdAt', 'DESC')


        const qrFillDate = this.jobApplyRepository.createQueryBuilder('ja')

        if (query.jobId) {
            qrView.andWhere({
                job: Id(query.jobId)
            })
            qrFillDate.andWhere({
                job: Id(query.jobId)
            })
        }

        if (!query.start) {
            qrFillDate.select('min(ja.createdAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                // subtract 1 unit because chart need more value
                let unit: moment.unitOfTime.DurationConstructor = 'day'
                switch (query.group) {
                    case StatisticGroupBy.Month:
                        unit = 'month'
                        break;
                    case StatisticGroupBy.Year:
                        unit = 'year';
                        break
                }
                query.start = moment(r.date).subtract(1, unit).toDate()
            }
        } else {
            qrView.andWhere({
                createdAt: MoreThanOrEqual(moment(query.start).toDate())
            })
        }

        if (!query.end) {
            qrFillDate.select('max(ja.createdAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                query.end = moment(r.date).toDate()
            }
        } else {
            qrView.andWhere({
                createdAt: LessThanOrEqual(moment(query.end).toDate())
            })
        }

        const view = await qrView.getRawMany();

        return fillAllDate(view, query.start, query.end, query.group);
    }
}
