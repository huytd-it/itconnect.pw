import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {DatabaseConfigService} from "./configs/database.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PolicesModule } from './polices/polices.module';
import { PermissionModule } from './modules/permission/permission.module';
import { AddressModule } from './modules/address/address.module';
import { SkillModule } from './modules/skill/skill.module';
import { PositionModule } from './modules/position/position.module';
import { WorkFromModule } from './modules/work-from/work-from.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useClass: DatabaseConfigService,
      }),
      AuthModule,
      ProfileModule,
      PolicesModule,
      PermissionModule,
      AddressModule,
      SkillModule,
      PositionModule,
      WorkFromModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
