import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserSkillEntity} from "./userSkill.entity";
import {CvWorkExperienceSkillEntity} from "./cvWorkExperienceSkill.entity";
import {UserTaggedSkillEntity} from "./userTaggedSkill.entity";

export const MAX_SKILL_NAME_LENGTH = 20;
export const MIN_SKILL_NAME_LENGTH = 1;

@Entity()
export class SkillEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['name'])
    name: string;

    @Column()
    @Index()
    isApprove: boolean;

    @OneToMany(type => UserSkillEntity, db => db.skill)
    userSkills: UserSkillEntity[]

    @OneToMany(type => UserTaggedSkillEntity, db => db.skill)
    userTaggedSkills: UserTaggedSkillEntity[]

    @OneToMany(type => CvWorkExperienceSkillEntity, db => db.skill)
    cvWorkExperienceSkills: CvWorkExperienceSkillEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}