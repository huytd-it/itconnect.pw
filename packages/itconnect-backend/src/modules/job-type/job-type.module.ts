import { Module } from '@nestjs/common';
import { JobTypeController } from './job-type.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [JobTypeController]
})
export class JobTypeModule {}
