import {Global, Module} from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {AddressEntity} from "../entities/address.entity";
import { AddressService } from './address.service';
import {UserInfoEntity} from "../entities/userInfo.entity";
import {PositionEntity} from "../entities/position.entity";
import {SkillEntity} from "../entities/skill.entity";
import {UserSkillEntity} from "../entities/userSkill.entity";
import {UserPositionEntity} from "../entities/userPosition.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
        UserEntity,
        UserInfoEntity,
        UserSkillEntity,
        UserPositionEntity,
        AddressEntity,
        PositionEntity,
        SkillEntity
    ])
  ],
  providers: [UserService, AddressService],
  exports: [
      UserService,
      AddressService
  ]
})
export class ServicesModule {}
