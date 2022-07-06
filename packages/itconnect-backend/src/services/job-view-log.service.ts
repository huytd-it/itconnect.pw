import {Inject, Injectable, Request, Scope} from '@nestjs/common';
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {JobViewLogEntity} from "../entities/jobViewLog.entity";
import {LessThanOrEqual, MoreThanOrEqual, Repository} from "typeorm";
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


        const qrFillDate = this.jobViewLogRepository.createQueryBuilder('jvl')

        if (query.jobId) {
            qrView.andWhere({
                job: Id(query.jobId)
            })
            qrFillDate.andWhere({
                job: Id(query.jobId)
            })
        }

        if (!query.start) {
            qrFillDate.select('min(jvl.createdAt) date');
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
            qrFillDate.select('max(jvl.createdAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                query.end = moment(r.date).toDate()
            }
        }else {
            qrView.andWhere({
                createdAt: LessThanOrEqual(moment(query.end).toDate())
            })
        }

        const view = await qrView.getRawMany();

        return fillAllDate(view, query.start, query.end, query.group);
    }
}
