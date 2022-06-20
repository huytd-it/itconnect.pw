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
import {EducationEntity} from "./education.entity";
import {WorkExperienceEntity} from "./workExperience.entity";


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

    @OneToMany(type => EducationEntity, db => db.user)
    educations: EducationEntity[];

    @OneToMany(type => WorkExperienceEntity, db => db.user)
    workExperiences: WorkExperienceEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}