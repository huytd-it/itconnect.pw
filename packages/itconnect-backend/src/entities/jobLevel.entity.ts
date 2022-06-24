import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Unique
} from "typeorm";
import {UserPositionEntity} from "./userPosition.entity";
import {UserInfoEntity} from "./userInfo.entity";
import {type} from "os";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";

export const MAX_JOB_LEVEL_NAME_LENGTH = 20;
export const MIN_JOB_LEVEL_NAME_LENGTH = 1;

@Entity()
export class JobLevelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['name'])
    name: string;

    @OneToMany(type => UserInfoEntity, db => db.jobLevel)
    userInfos: UserInfoEntity[]

    @OneToMany(type => CvWorkExperienceEntity, db => db.jobLevel)
    cvWorkExperiences: CvWorkExperienceEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}