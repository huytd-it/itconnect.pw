import { Module } from '@nestjs/common';
import { CompanyTagController } from './company-tag.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [CompanyTagController]
})
export class CompanyTagModule {}
