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

    owner(jobId: number) {
        return this.jobSavedRepository.findOne({
            where: {
                id: jobId,
                user: Id(this.user.id)
            }
        })
    }

    async search(search: JobSavedSearchInputDto, page: PageOptionsDto) {
        const query = this.jobSavedRepository.createQueryBuilder('jobSaved');
        query.leftJoinAndSelect('jobSaved.job', 'job');

        if (search.search) {
            query.where(`(job.name like :param_search)`, {
                'param_search': `%${search.search}%`
            });
        }

        if (page.order && page.order_field) {
            query.orderBy(page.order_field, page.order)
        }

        // count all data
        const total = await query.getCount();

        // query data
        query.skip(page.skip);
        query.take(page.take);
        const result = await query.getMany();

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
}
