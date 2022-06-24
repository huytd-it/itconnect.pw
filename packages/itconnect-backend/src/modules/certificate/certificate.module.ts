import { Module } from '@nestjs/common';
import {ServicesModule} from "../../services/services.module";
import { CertificateController } from './certificate.controller';

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [CertificateController]
})
export class CertificateModule {}
