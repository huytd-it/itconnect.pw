import {ConflictException, ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {JobApplyCreateInputDto, JobApplySearchInputDto} from "../dtos/jobApply.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {JobApplyEntity} from "../entities/jobApply.entity";
import {MoreThanOrEqual, Repository} from "typeorm";
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
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
            qr.leftJoinAndSelect('jobApply.user', 'user');
            qr.leftJoinAndSelect('user.userInfo', 'userInfo');
            qr.leftJoinAndSelect('userInfo.addressProvince', 'addressProvinceUI');
            qr.leftJoinAndSelect('userInfo.addressDistrict', 'addressDistrictUI');
            qr.leftJoinAndSelect('userInfo.addressVillage', 'addressVillageUI');
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
        }

        if (search.search) {
            let whereClause = '(job.name like :param_search)';
            if (this.user.role === AppRole.company) {
                whereClause += ' or (user.fullName like :param_search)';
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

    async delete(id: number) {
        // only user owner
        const owner = await this.owner(id);
        if (owner) {
            return this.jobApplyRepository.remove(owner);
        }

        throw new ForbiddenException()
    }
}
