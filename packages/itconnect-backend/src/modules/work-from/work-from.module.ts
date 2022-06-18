import { Module } from '@nestjs/common';
import { WorkFromController } from './work-from.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [WorkFromController]
})
export class WorkFromModule {}
