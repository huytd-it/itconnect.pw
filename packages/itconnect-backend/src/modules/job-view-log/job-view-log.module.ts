import { Module } from '@nestjs/common';
import { JobViewLogController } from './job-view-log.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
    ServicesModule
  ],
  controllers: [JobViewLogController]
})
export class JobViewLogModule {}
