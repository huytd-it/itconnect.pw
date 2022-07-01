import { Module } from '@nestjs/common';
import { PointJobUserController } from './point-job-user.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [PointJobUserController]
})
export class PointJobUserModule {}
