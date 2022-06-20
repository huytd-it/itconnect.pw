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
import {WorkExperienceSkillEntity} from "./workExperienceSkill.entity";
import {WorkExperiencePositionEntity} from "./workExperiencePosition.entity";


@Entity()
export class WorkExperienceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    companyName: string;

    @Column()
    content: string;

    @ManyToOne(type => CompanyInfoEntity)
    companyInfo: CompanyInfoEntity;

    @ManyToOne(type => JobLevelEntity)
    jobLevel: JobLevelEntity;

    @ManyToOne(type => WorkFromEntity)
    workFrom: WorkFromEntity;

    @OneToMany(type => WorkExperienceSkillEntity, db => db.workExperience)
    workExperienceSkills: WorkExperienceSkillEntity[];

    @OneToMany(type => WorkExperiencePositionEntity, db => db.workExperience)
    workExperiencePositions: WorkExperiencePositionEntity[];

    @ManyToOne(type => SkillEntity)
    skill: SkillEntity;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}