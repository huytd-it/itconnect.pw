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
import {JobLevelEntity} from "../entities/jobLevel.entity";
import {JobLevelService} from "./jobLevel.service";
import {SchoolService} from "./school.service";
import {SchoolEntity} from "../entities/school.entity";
import {CertificateService} from "./certificate.service";
import {CertificateEntity} from "../entities/certificate.entity";
import {UserTaggedSkillEntity} from "../entities/userTaggedSkill.entity";
import {UserTaggedPositionEntity} from "../entities/userTaggedPosition.entity";
import {UserTaggedCertificateEntity} from "../entities/userTaggedCertificate.entity";
import {UserTaggedSchoolEntity} from "../entities/userTaggedSchool.entity";
import {UserSchoolEntity} from "../entities/userSchool.entity";
import {UserCertificateEntity} from "../entities/userCertificate.entity";
import { UserPositionService } from './user-position.service';
import {UserSkillService} from "./user-skill.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
        UserEntity,
        UserInfoEntity,
        UserSkillEntity,
        UserPositionEntity,
        UserSchoolEntity,
        UserCertificateEntity,
        UserTaggedSkillEntity,
        UserTaggedPositionEntity,
        UserTaggedCertificateEntity,
        UserTaggedSchoolEntity,
        AddressEntity,
        PositionEntity,
        SkillEntity,
        CompanyInfoEntity,
        WorkFromEntity,
        JobLevelEntity,
        SchoolEntity,
        CertificateEntity,
    ])
  ],
  providers: [
      UserService,
      AddressService,
      SkillService,
      PositionService,
      WorkFromService,
      JobLevelService,
      SchoolService,
      CertificateService,
      UserPositionService,
      UserSkillService
  ],
  exports: [
      UserService,
      AddressService,
      SkillService,
      PositionService,
      WorkFromService,
      JobLevelService,
      SchoolService,
      CertificateService,
      UserPositionService,
      UserSkillService
  ]
})
export class ServicesModule {}
