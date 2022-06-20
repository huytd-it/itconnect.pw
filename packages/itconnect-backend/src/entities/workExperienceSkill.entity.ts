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

export const MAX_WORK_EXPERIENCE_SKILL = 20;
export const MIN_WORK_EXPERIENCE_SKILL = 1;

@Entity()
export class WorkExperienceSkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(type => WorkExperienceEntity)
    workExperience: WorkExperienceEntity;

    @ManyToOne(type => SkillEntity)
    skill!: SkillEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}