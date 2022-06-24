import { Module } from '@nestjs/common';
import { CvCertificateController } from './cv-certificate.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule
  ],
  controllers: [CvCertificateController]
})
export class CvCertificateModule {}
