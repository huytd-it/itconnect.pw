import {forwardRef, Module} from '@nestjs/common';
import {PointWithJobProcessor} from "./point-with-job.processor";
import {BullModule} from "@nestjs/bull";
import {QueuePointWithJob, QueuePointWithUser} from "./queue.enum";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ServicesModule} from "../services/services.module";
import { PointJobUserQueue } from './point-job-user.queue';
import {PointWithUserProcess, PointWithUserProcessor} from "./point-with-user.processor";

@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    redis: {
                        host: configService.get('REDIS_HOST'),
                        port: configService.get('REDIS_PORT'),
                    },
                }
            }
        }),
        BullModule.registerQueue({
            name: QueuePointWithJob,
        }),
        BullModule.registerQueue({
            name: QueuePointWithUser
        }),
        forwardRef(() => ServicesModule)
    ],
    providers: [
        PointWithJobProcessor,
        PointWithUserProcessor,
        PointJobUserQueue
    ],
    exports: [
        PointJobUserQueue
    ]
})
export class QueuesModule {
}
