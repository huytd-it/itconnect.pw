import { Module } from '@nestjs/common';
import { RankedAcademicController } from './ranked-academic.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [RankedAcademicController]
})
export class RankedAcademicModule {}
