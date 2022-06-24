import { Module } from '@nestjs/common';
import { UserCertificateController } from './user-certificate.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [UserCertificateController]
})
export class UserCertificateModule {}
