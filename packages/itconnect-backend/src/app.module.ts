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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
