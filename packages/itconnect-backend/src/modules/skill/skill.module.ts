import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [SkillController]
})
export class SkillModule {}
