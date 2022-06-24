import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, JoinColumn, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserPositionEntity} from "./userPosition.entity";
import {CvEducationEntity} from "./cvEducation.entity";
import {UserSkillEntity} from "./userSkill.entity";
import {UserSchoolEntity} from "./userSchool.entity";
import {UserTaggedSchoolEntity} from "./userTaggedSchool.entity";
import {UserTaggedCompanyTagEntity} from "./userTaggedCompanyTag.entity";
import {CompanyInfoEntity} from "./companyInfo.entity";

export const MAX_COMPANY_TAG_NAME_LENGTH = 255;
export const MIN_COMPANY_TAG_NAME_LENGTH = 1;

@Entity()
export class CompanyTagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['name'])
    name: string;

    @Column({ default: false })
    @Index()
    isApprove: boolean;

    @OneToOne(type => CompanyInfoEntity)
    @JoinColumn()
    companyInfo: CompanyInfoEntity;

    @OneToMany(type => UserTaggedCompanyTagEntity, db => db.companyTag)
    userTaggedCompanyTags: UserTaggedCompanyTagEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}