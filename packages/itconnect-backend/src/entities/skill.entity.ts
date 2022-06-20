import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserSkillEntity} from "./userSkill.entity";
import {WorkExperienceEntity} from "./workExperience.entity";

export const MAX_SKILL_NAME_LENGTH = 20;
export const MIN_SKILL_NAME_LENGTH = 1;

@Entity()
export class SkillEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @OneToMany(type => UserSkillEntity, db => db.skill)
    userSkills: UserSkillEntity[]

    @OneToMany(type => WorkExperienceEntity, db => db.skill)
    workExperiences: WorkExperienceEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}