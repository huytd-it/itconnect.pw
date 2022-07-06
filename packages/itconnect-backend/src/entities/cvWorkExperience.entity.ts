import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {CompanyInfoEntity} from "./companyInfo.entity";
import {PositionEntity} from "./position.entity";
import {SkillEntity} from "./skill.entity";
import {JobLevelEntity} from "./jobLevel.entity";
import {WorkFromEntity} from "./workFrom.entity";
import {CvWorkExperienceSkillEntity} from "./cvWorkExperienceSkill.entity";
import {CvWorkExperiencePositionEntity} from "./cvWorkExperiencePosition.entity";
import {CompanyTagEntity} from "./companyTag.entity";
import {JobTypeEntity} from "./jobType.entity";

export const MAX_WORK_EXPERIENCE_LENGTH = 20000;

export enum CvWorkExperienceStatus {
    NotVerify = 1,
    WaitVerify = 2,
    Verify = 3
}

@Entity()
export class CvWorkExperienceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ nullable: true, type: 'text' })
    content: string;

    @Column({ default: CvWorkExperienceStatus.NotVerify })
    status: CvWorkExperienceStatus;

    @ManyToOne(type => CompanyTagEntity)
    companyTag: CompanyTagEntity;

    @ManyToOne(type => JobLevelEntity)
    jobLevel: JobLevelEntity;

    @ManyToOne(type => JobTypeEntity)
    jobType: JobTypeEntity;

    @ManyToOne(type => WorkFromEntity)
    workFrom: WorkFromEntity;

    @OneToMany(type => CvWorkExperienceSkillEntity, db => db.cvWorkExperience)
    cvWorkExperienceSkills: CvWorkExperienceSkillEntity[];

    @OneToMany(type => CvWorkExperiencePositionEntity, db => db.cvWorkExperience)
    cvWorkExperiencePositions: CvWorkExperiencePositionEntity[];

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}