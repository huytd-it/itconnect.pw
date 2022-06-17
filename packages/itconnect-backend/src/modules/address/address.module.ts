import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [ServicesModule],
  controllers: [AddressController]
})
export class AddressModule {}
