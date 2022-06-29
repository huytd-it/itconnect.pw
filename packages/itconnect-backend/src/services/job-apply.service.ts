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
        const query = this.jobApplyRepository.createQueryBuilder('jobApply');
        query.leftJoinAndSelect('jobApply.job', 'job');

        if (this.user.role === AppRole.company) {
            query.leftJoinAndSelect('jobApply.user', 'user');
        }

        if (search.search) {
            let whereClause = '(job.name like :param_search)';
            if (this.user.role === AppRole.company) {
                whereClause += ' or (user.fullName like :param_search)';
            }
            query.where(`(${whereClause})`, {
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
