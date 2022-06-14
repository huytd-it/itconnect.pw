import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigService} from "./configs/typorm.config";
import {reportTranspileErrors} from "ts-loader/dist/instances";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useClass: TypeOrmConfigService,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
