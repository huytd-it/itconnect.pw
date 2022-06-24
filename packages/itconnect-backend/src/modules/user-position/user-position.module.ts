import { Module } from '@nestjs/common';
import { UserPositionController } from './user-position.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [
      ServicesModule,
  ],
  controllers: [UserPositionController]
})
export class UserPositionModule {}
