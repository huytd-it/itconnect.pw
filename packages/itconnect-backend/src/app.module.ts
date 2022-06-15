import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {DatabaseConfigService} from "./configs/database.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
