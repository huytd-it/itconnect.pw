import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import {
    QueuePointWithJob,
    QueuePointWithJobConcurrency,
    QueuePointWithUser,
    QueuePointWithUserConcurrency, QueuePointWithUserWaitTime
} from "./queue.enum";
import {PointJobUserService} from "../services/point-job-user.service";
import {UserService} from "../services/user.service";

export enum PointWithUserProcess {
    compute = 'compute'
}

@Processor(QueuePointWithUser)
export class PointWithUserProcessor {
    private readonly logger = new Logger(PointWithUserProcessor.name);

    constructor(
        private pointJobUserService: PointJobUserService,
        private userService: UserService
    ) {
    }

    @Process({
        name: PointWithUserProcess.compute,
        concurrency: QueuePointWithUserWaitTime
    })
    async handleCompute(job: Job) {
        let t = new Date().getTime();
        // waiting
        if (t - job.timestamp < QueuePointWithUserWaitTime) {
            const ms = QueuePointWithUserWaitTime - (t - job.timestamp);
            this.logger.debug(`Wait compute user... id:${job.id} userId:${job.data.userId} time:${ms}ms`);
            await new Promise((res) => setTimeout(res, ms));
        }
        if (await job.isCompleted()) {
            this.logger.debug(`Cancel compute user... id:${job.id} userId:${job.data.userId}`);
            return;
        }

        // remove job queue id in db
        await this.userService.updateComputePointQueue(job.data.userId, null);

        // run
        t = new Date().getTime()
        this.logger.debug(`Start compute user... id:${job.id} userId:${job.data.userId}`);
        const result = await this.pointJobUserService.computeWithUser(job.data.userId);
        await job.progress(100);
        this.logger.debug(`Compute user completed. total ${result}. ${new Date().getTime() - t}ms`);
        return result;
    }
}