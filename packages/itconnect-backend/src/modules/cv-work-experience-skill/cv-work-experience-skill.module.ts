import { Module } from '@nestjs/common';
import { CvWorkExperienceSkillController } from './cv-work-experience-skill.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [CvWorkExperienceSkillController]
})
export class CvWorkExperienceSkillModule {}
