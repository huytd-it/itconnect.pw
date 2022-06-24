import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [SchoolController]
})
export class SchoolModule {}
