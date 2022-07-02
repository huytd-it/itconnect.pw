import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import {MulterModule} from "@nestjs/platform-express";
import {StorageConfig} from "../../configs/storage.config";
import {ServicesModule} from "../../services/services.module";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: StorageConfig
    }),
      ServicesModule
  ],
  controllers: [FileController]
})
export class FileModule {}
