import {Global, Module} from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {AddressEntity} from "../entities/address.entity";
import { AddressService } from './address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        UserEntity,
        AddressEntity
    ])
  ],
  providers: [UserService, AddressService],
  exports: [
      UserService,
      AddressService
  ]
})
export class ServicesModule {}
