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


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    email: string;

    @Column()
    password: string;

    @Column({ default: AppRole.begin })
    @Index()
    role: AppRole;

    @OneToOne(type => UserInfoEntity)
    userInfo: UserInfoEntity;

    @OneToOne(type => CompanyInfoEntity)
    companyInfo: CompanyInfoEntity;

    @OneToMany(type => UserSkillEntity, userSkill => userSkill.user)
    userSkills: SkillEntity[];

    @OneToMany(type => UserSchoolEntity, userSkill => userSkill.user)
    userSchools: UserSchoolEntity[];

    @OneToMany(type => UserCertificateEntity, db => db.user)
    userCertificates: UserCertificateEntity[];

    @OneToMany(type => CvEducationEntity, db => db.user)
    cvEducations: CvEducationEntity[];

    @OneToMany(type => CvWorkExperienceEntity, db => db.user)
    cvWorkExperiences: CvWorkExperienceEntity[];

    @OneToMany(type => CvHonorsAwardsEntity, db => db.user)
    cvHonorsAwards: CvHonorsAwardsEntity[];

    @OneToMany(type => CvActivitiesEntity, db => db.user)
    cvActivities: CvActivitiesEntity[];

    @OneToMany(type => CvCertificateEntity, db => db.user)
    cvCertificates: CvCertificateEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}