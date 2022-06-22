import { Module } from '@nestjs/common';
import { CvWorkExperiencePositionController } from './cv-work-experience-position.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [CvWorkExperiencePositionController]
})
export class CvWorkExperiencePositionModule {}
