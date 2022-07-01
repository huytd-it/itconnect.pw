import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, JoinColumn, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {AppRole} from "../polices/permission.enum";
import {UserSkillEntity} from "./userSkill.entity";
import {SkillEntity} from "./skill.entity";
import {UserInfoEntity} from "./userInfo.entity";
import {CompanyInfoEntity} from "./companyInfo.entity";
import {CvEducationEntity} from "./cvEducation.entity";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";
import {CvActivitiesEntity} from "./cvActivities.entity";
import {CvHonorsAwardsEntity} from "./cvHonorsAwards.entity";
import {UserCertificateEntity} from "./userCertificate.entity";
import {CvCertificateEntity} from "./cvCertificate.entity";
import {UserSchoolEntity} from "./userSchool.entity";
import {JobApplyEntity} from "./jobApply.entity";
import {JobSavedEntity} from "./jobSaved.entity";
import {PositionEntity} from "./position.entity";
import {UserPositionEntity} from "./userPosition.entity";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: AppRole.begin })
    @Index()
    role: AppRole;

    @Column({ nullable: true })
    computePointQueueId: string;

    @OneToOne(type => UserInfoEntity, db => db.user)
    userInfo: UserInfoEntity;

    @OneToOne(type => CompanyInfoEntity, db => db.user)
    companyInfo: CompanyInfoEntity;

    @OneToMany(type => UserSkillEntity, db => db.user)
    userSkills: SkillEntity[];

    @OneToMany(type => UserPositionEntity, db => db.user)
    userPositions: UserPositionEntity[];

    @OneToMany(type => UserSchoolEntity, db => db.user)
    userSchools: UserSchoolEntity[];

    @OneToMany(type => UserCertificateEntity, db => db.user)
    userCertificates: UserCertificateEntity[];

    @OneToMany(type => CvEducationEntity, db => db.user)
    cvEducations: CvEducationEntity[];

    @OneToMany(type => CvWorkExperienceEntity, db => db.user)
    cvWorkExperiences: CvWorkExperienceEntity[];

    @OneToMany(type => CvWorkExperienceEntity, db => db.user)
    cvWorkExperienceCurrents: CvWorkExperienceEntity[];

    @OneToMany(type => CvHonorsAwardsEntity, db => db.user)
    cvHonorsAwards: CvHonorsAwardsEntity[];

    @OneToMany(type => CvActivitiesEntity, db => db.user)
    cvActivities: CvActivitiesEntity[];

    @OneToMany(type => CvCertificateEntity, db => db.user)
    cvCertificates: CvCertificateEntity[];

    @OneToMany(type => JobApplyEntity, db => db.user)
    jobApply: JobApplyEntity[];

    @OneToMany(type => JobSavedEntity, db => db.user)
    jobSaved: JobApplyEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}