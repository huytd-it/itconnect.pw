import { Injectable } from '@nestjs/common';
import {InjectQueue} from "@nestjs/bull";
import {QueuePointWithJob, QueuePointWithUser} from "./queue.enum";
import {Queue} from "bull";
import {PointWithJobProcess} from "./point-with-job.processor";
import {UserService} from "../services/user.service";
import {PointWithUserProcess} from "./point-with-user.processor";

@Injectable()
export class PointJobUserQueue {

    constructor(
        @InjectQueue(QueuePointWithJob) private pointWithJobQueue: Queue,
        @InjectQueue(QueuePointWithUser) private pointWithUserQueue: Queue,
        private userService: UserService
    ) {
    }

    async registerComputeJob(jobId: number) {
        return this.pointWithJobQueue.add(PointWithJobProcess.compute, { jobId });
    }

    async registerComputeUser(userId: number) {
        const user = await this.userService.find(userId);
        if (!user.computePointQueueId) {
            const job = await this.pointWithUserQueue.add(PointWithUserProcess.compute, { userId });
            await this.userService.updateComputePointQueue(userId, job.id.toString());
            return job;
        }
    }
}
