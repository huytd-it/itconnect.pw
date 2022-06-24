import { Module } from '@nestjs/common';
import { CvEducationController } from './cv-education.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [CvEducationController]
})
export class CvEducationModule {}
