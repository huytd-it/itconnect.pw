import { Module } from '@nestjs/common';
import { CvWorkExperienceController } from './cv-work-experience.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [CvWorkExperienceController]
})
export class CvWorkExperienceModule {}
