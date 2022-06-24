import { Module } from '@nestjs/common';
import { UserSkillController } from './user-skill.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [UserSkillController]
})
export class UserSkillModule {}
