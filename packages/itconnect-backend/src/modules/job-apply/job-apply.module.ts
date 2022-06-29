import { Module } from '@nestjs/common';
import { JobApplyController } from './job-apply.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
    ServicesModule
  ],
  controllers: [JobApplyController]
})
export class JobApplyModule {}
