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
import {WorkExperienceEntity} from "./workExperience.entity";
import {PositionEntity} from "./position.entity";

export const MAX_WORK_EXPERIENCE_POSITION = 20;
export const MIN_WORK_EXPERIENCE_POSITION = 1;

@Entity()
export class WorkExperiencePositionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(type => WorkExperienceEntity)
    workExperience: WorkExperienceEntity;

    @ManyToOne(type => PositionEntity)
    position!: PositionEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}