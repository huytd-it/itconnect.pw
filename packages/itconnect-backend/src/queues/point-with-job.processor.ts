import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import {QueuePointWithJob, QueuePointWithJobConcurrency} from "./queue.enum";
import {PointJobUserService} from "../services/point-job-user.service";

export enum PointWithJobProcess {
    compute = 'compute'
}

@Processor(QueuePointWithJob)
export class PointWithJobProcessor {
    private readonly logger = new Logger(PointWithJobProcessor.name);

    constructor(
        private pointJobUserService: PointJobUserService
    ) {
    }

    @Process({
        name: PointWithJobProcess.compute,
        concurrency: QueuePointWithJobConcurrency
    })
    async handleCompute(job: Job) {
        let t = new Date().getTime();
        this.logger.debug(`Start compute job... id:${job.id} jobId:${job.data.jobId}`);
        const result = await this.pointJobUserService.computeWithJob(job.data.jobId);
        await job.progress(100);
        this.logger.debug(`Compute job completed. total ${result}. ${new Date().getTime() - t}ms`);
        return result;
    }
}