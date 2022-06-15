import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {DatabaseConfigService} from "./configs/database.config";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useClass: DatabaseConfigService,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
