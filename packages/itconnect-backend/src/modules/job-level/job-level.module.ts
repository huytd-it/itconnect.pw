import { Module } from '@nestjs/common';
import { JobLevelController } from './job-level.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [JobLevelController]
})
export class JobLevelModule {}
