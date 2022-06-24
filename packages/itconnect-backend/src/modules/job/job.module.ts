import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import {JobService} from "../../services/job.service";
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [ServicesModule],
  controllers: [JobController]
})
export class JobModule {}
