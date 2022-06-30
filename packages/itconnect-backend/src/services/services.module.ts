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
import {CompanyTagEntity} from "../entities/companyTag.entity";
import {UserTaggedCompanyTagEntity} from "../entities/userTaggedCompanyTag.entity";
import {CompanyTagService} from "./company-tag.service";
import { CvWorkExperienceService } from './cv-work-experience.service';
import {CvWorkExperienceSkillEntity} from "../entities/cvWorkExperienceSkill.entity";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {CvWorkExperiencePositionEntity} from "../entities/cvWorkExperiencePosition.entity";
import {CvWorkExperienceSkillService} from "./cv-work-experience-skill.service";
import {CvWorkExperiencePositionService} from "./cv-work-experience-position.service";
import {UserCertificateService} from "./user-certificate.service";
import {CvCertificateEntity} from "../entities/cvCertificate.entity";
import {CvCertificateService} from "./cv-certificate.service";
import {RankedAcademicEntity} from "../entities/rankedAcademic.entity";
import {RankedAcademicService} from "./rankedAcademic.service";
import {CvEducationEntity} from "../entities/cvEducation.entity";
import {CvEducationService} from "./cv-education.service";
import { JobService } from './job.service';
import {JobEntity} from "../entities/job.entity";
import {JobJobLevelCreateOrEditDto} from "../dtos/job.dto";
import {JobJobLevelEntity} from "../entities/jobJobLevel.entity";
import {JobPositionEntity} from "../entities/jobPosition.entity";
import {JobSkillEntity} from "../entities/jobSkill.entity";
import {JobWorkFromEntity} from "../entities/jobWorkFrom.entity";
import {JobCertificateEntity} from "../entities/jobCertificate.entity";
import {JobSchoolEntity} from "../entities/jobSchool.entity";
import {JobTypeService} from "./jobType.service";
import {JobTypeEntity} from "../entities/jobType.entity";
import {PeopleService} from "./people.service";
import { Company3rdService } from './company-3rd.service';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { JobApplyService } from './job-apply.service';
import {JobApplyEntity} from "../entities/jobApply.entity";
import {JobSavedEntity} from "../entities/jobSaved.entity";
import {JobSavedService} from "./job-saved.service";
import {PointConfigEntity} from "../entities/pointConfig.entity";
import {PointJobUserEntity} from "../entities/pointJobUser.entity";
import { PointJobUserService } from './point-job-user.service';
import { PointConfigService } from './point-config.service';

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
        UserTaggedCompanyTagEntity,
        AddressEntity,
        PositionEntity,
        SkillEntity,
        CompanyInfoEntity,
        WorkFromEntity,
        JobLevelEntity,
        SchoolEntity,
        CertificateEntity,
        CompanyTagEntity,
        CvWorkExperienceEntity,
        CvWorkExperienceSkillEntity,
        CvWorkExperiencePositionEntity,
        CvCertificateEntity,
        RankedAcademicEntity,
        CvEducationEntity,
        JobEntity,
        JobJobLevelEntity,
        JobPositionEntity,
        JobSkillEntity,
        JobWorkFromEntity,
        JobCertificateEntity,
        JobSchoolEntity,
        JobTypeEntity,
        JobApplyEntity,
        JobSavedEntity,
        PointConfigEntity,
        PointJobUserEntity
    ]),
      HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
              timeout: configService.get('HTTP_TIMEOUT'),
              maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
          }),
          inject: [ConfigService],
      })
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
      UserSkillService,
      UserCertificateService,
      CompanyTagService,
      CvWorkExperienceService,
      CvWorkExperienceSkillService,
      CvWorkExperiencePositionService,
      CvCertificateService,
      RankedAcademicService,
      CvEducationService,
      JobService,
      JobTypeService,
      PeopleService,
      Company3rdService,
      JobApplyService,
      JobSavedService,
      PointJobUserService,
      PointConfigService
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
      UserSkillService,
      UserCertificateService,
      CompanyTagService,
      CvWorkExperienceService,
      CvWorkExperienceSkillService,
      CvWorkExperiencePositionService,
      CvCertificateService,
      RankedAcademicService,
      CvEducationService,
      JobService,
      JobTypeService,
      PeopleService,
      Company3rdService,
      JobApplyService,
      JobSavedService,
      PointJobUserService,
      PointConfigService
  ]
})
export class ServicesModule {}
