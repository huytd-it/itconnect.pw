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
import {JobSavedEntity} from "../entities/jobSaved.entity";
import {JobSavedSearchInputDto} from "../dtos/jobSaved.dto";

@Injectable({ scope: Scope.REQUEST })
export class JobSavedService {
    constructor(
        @InjectRepository(JobSavedEntity)
        private jobSavedRepository: Repository<JobSavedEntity>,
        @InjectRepository(JobEntity)
        private jobRepository: Repository<JobEntity>,
        @Inject(REQUEST) private request: Request
    ) {
    }

    get user() {
        return this.request['user'] as UserEntity;
    }

    owner(id: number) {
        return this.jobSavedRepository.findOne({
            where: {
                id: id,
                user: Id(this.user.id)
            }
        })
    }

    async search(search: JobSavedSearchInputDto, page: PageOptionsDto) {
        const qr = this.jobSavedRepository.createQueryBuilder('jobSaved');
        qr.innerJoinAndSelect('jobSaved.job', 'job');
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

        if (this.user.role === AppRole.user) {
            qr.andWhere({
                user: Id(this.user.id)
            })
        }

        if (search.search) {
            qr.where(`(job.name like :param_search)`, {
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
        // check is saved
        const jobApply = await this.jobSavedRepository.findOne({
            where: {
                user: Id(this.user.id),
                job: Id(data.jobId)
            }
        })
        if (jobApply) {
            throw new ConflictException('Bạn đã apply rồi')
        }

        // apply
        return this.jobSavedRepository.save([
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
            return this.jobSavedRepository.remove(owner);
        }

        throw new ForbiddenException()
    }

    async deleteByJobId(id: number) {
        const owner = await this.jobSavedRepository.findOne({
            where: {
                job: Id(id),
                user: Id(this.user.id)
            }
        })

        if (owner) {
            return this.jobSavedRepository.remove(owner);
        }

        throw new ForbiddenException()
    }
}
