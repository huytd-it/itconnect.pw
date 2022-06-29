import { Module } from '@nestjs/common';
import { JobSavedController } from './job-saved.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
    ServicesModule
  ],
  controllers: [JobSavedController]
})
export class JobSavedModule {}
