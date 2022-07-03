import {Inject, Injectable, Request, Scope} from '@nestjs/common';
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {JobViewLogEntity} from "../entities/jobViewLog.entity";
import {Repository} from "typeorm";
import {Id} from "../utils/function";
import {UserEntity} from "../entities/user.entity";
import {JobViewLogStatisticOption} from "../dtos/job-view-log.dto";
import {fillAllDate, getFormatDateGroupBy, StatisticGroupBy} from "../dtos/page.dto";
import * as moment from "moment";

@Injectable({ scope: Scope.REQUEST })
export class JobViewLogService {

    constructor(
        @Inject(REQUEST) private request: Request,
        @InjectRepository(JobViewLogEntity)
        private jobViewLogRepository: Repository<JobViewLogEntity>
    ) {
    }

    get user() {
        return this.request['user'] as UserEntity;
    }

    create(id: number) {
        return this.jobViewLogRepository.save({
            job: Id(id),
            user: Id(this.user.id)
        })
    }


    async sts(query: JobViewLogStatisticOption) {
        const qrView = this.jobViewLogRepository.createQueryBuilder('jvl');
        qrView.select(`
            DATE_FORMAT(jvl.createdAt,:prm_group) legend,
            COUNT(*) countView,
            COUNT(DISTINCT jvl.user) countUnique
        `);
        qrView.setParameter('prm_group', getFormatDateGroupBy(query.group));
        qrView.groupBy('legend')
        qrView.orderBy('jvl.createdAt', 'DESC')

        if (query.jobId) {
            qrView.andWhere({
                job: Id(query.jobId)
            })
        }

        const view = await qrView.getRawMany();
        return fillAllDate(view, query.start, query.end, query.group);
    }
}
