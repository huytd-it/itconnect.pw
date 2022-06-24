import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {SkillEntity} from "./skill.entity";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";
import {UserSkillEntity} from "./userSkill.entity";

export const MAX_WORK_EXPERIENCE_SKILL = 20;
export const MIN_WORK_EXPERIENCE_SKILL = 1;

@Entity()
@Unique(['cvWorkExperience', 'skill'])
export class CvWorkExperienceSkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => CvWorkExperienceEntity)
    cvWorkExperience: CvWorkExperienceEntity;

    @ManyToOne(type => SkillEntity)
    skill: SkillEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}