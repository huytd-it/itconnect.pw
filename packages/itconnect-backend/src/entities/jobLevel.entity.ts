import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserPositionEntity} from "./userPosition.entity";
import {UserInfoEntity} from "./userInfo.entity";
import {type} from "os";
import {WorkExperienceEntity} from "./workExperience.entity";

export const MAX_JOB_LEVEL_NAME_LENGTH = 20;
export const MIN_JOB_LEVEL_NAME_LENGTH = 1;

@Entity()
export class JobLevelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @OneToMany(type => UserInfoEntity, db => db.jobLevel)
    userInfos: UserInfoEntity[]

    @OneToMany(type => WorkExperienceEntity, db => db.jobLevel)
    workExperiences: WorkExperienceEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}