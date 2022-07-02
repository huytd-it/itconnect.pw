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
import {JobLevelModule} from "./modules/job-level/job-level.module";
import { ValidatorsModule } from './validators/validators.module';
import {APP_GUARD} from "@nestjs/core";
import {PageGuard} from "./utils/guards/page.guard";
import {SchoolModule} from "./modules/school/school.module";
import {CertificateModule} from "./modules/certificate/certificate.module";
import { UserPositionModule } from './modules/user-position/user-position.module';
import {UserCertificateModule} from "./modules/user-certificate/user-certificate.module";
import {CompanyTagModule} from "./modules/company-tag/company-tag.module";
import { CvWorkExperienceModule } from './modules/cv-work-experience/cv-work-experience.module';
import {CvWorkExperienceSkillModule} from "./modules/cv-work-experience-skill/cv-work-experience-skill.module";
import {CvWorkExperiencePositionModule} from "./modules/cv-work-experience-position/cv-work-experience-position.module";
import {CvCertificateModule} from "./modules/cv-certificate/cv-certificate.module";
import {UserSkillModule} from "./modules/user-skill/user-skill.module";
import {RankedAcademicModule} from "./modules/ranked-academic/ranked-academic.module";
import {CvEducationModule} from "./modules/cv-education/cv-education.module";
import { JobModule } from './modules/job/job.module';
import {JobTypeModule} from "./modules/job-type/job-type.module";
import {PeopleModule} from "./modules/people/people.module";
import { Company3rdModule } from './modules/company-3rd/company-3rd.module';
import { JobApplyModule } from './modules/job-apply/job-apply.module';
import {JobSavedModule} from "./modules/job-saved/job-saved.module";
import {BullModule} from "@nestjs/bull";
import {QueuePointWithJob, QueuePointWithUser} from "./queues/queue.enum";
import { QueuesModule } from './queues/queues.module';
import {PointJobUserModule} from "./modules/point-job-user/point-job-user.module";
import {ServicesModule} from "./services/services.module";
import { FileModule } from './modules/file/file.module';

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
      JobLevelModule,
      ValidatorsModule,
      SchoolModule,
      CertificateModule,
      UserPositionModule,
      UserSkillModule,
      UserCertificateModule,
      CompanyTagModule,
      CvWorkExperienceModule,
      CvWorkExperienceSkillModule,
      CvWorkExperiencePositionModule,
      CvCertificateModule,
      RankedAcademicModule,
      CvEducationModule,
      JobModule,
      JobTypeModule,
      PeopleModule,
      Company3rdModule,
      JobApplyModule,
      JobSavedModule,
      QueuesModule,
      PointJobUserModule,
      FileModule
  ],
  controllers: [AppController],
  providers: [
      AppService,
      {
          provide: APP_GUARD,
          useClass: PageGuard
      }
  ],
})
export class AppModule {}
