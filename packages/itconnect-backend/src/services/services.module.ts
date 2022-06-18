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
import { SkillService } from './skill.service';
import { PositionService } from './position.service';
import {CompanyInfoEntity} from "../entities/companyInfo.entity";
import {WorkFromEntity} from "../entities/workFrom.entity";
import {WorkFromService} from "./workFrom.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
        UserEntity,
        UserInfoEntity,
        UserSkillEntity,
        UserPositionEntity,
        AddressEntity,
        PositionEntity,
        SkillEntity,
        CompanyInfoEntity,
        WorkFromEntity
    ])
  ],
  providers: [UserService, AddressService, SkillService, PositionService, WorkFromService],
  exports: [
      UserService,
      AddressService,
      SkillService,
      PositionService,
      WorkFromService
  ]
})
export class ServicesModule {}
