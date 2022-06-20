import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {SkillEntity} from "./skill.entity";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";
import {PositionEntity} from "./position.entity";
import {UserPositionEntity} from "./userPosition.entity";

export const MAX_WORK_EXPERIENCE_POSITION = 20;
export const MIN_WORK_EXPERIENCE_POSITION = 1;

@Entity()
export class CvWorkExperiencePositionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => CvWorkExperienceEntity)
    cvWorkExperience: CvWorkExperienceEntity;

    @ManyToOne(type => UserPositionEntity)
    userPosition: UserPositionEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}