import { Module } from '@nestjs/common';
import { Company3rdController } from './company-3rd.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [Company3rdController]
})
export class Company3rdModule {}
