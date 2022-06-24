import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, Index,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {SkillEntity} from "./skill.entity";
import {CvWorkExperiencePositionEntity} from "./cvWorkExperiencePosition.entity";
import {PositionEntity} from "./position.entity";
import {CvWorkExperienceSkillEntity} from "./cvWorkExperienceSkill.entity";

export const MAX_USER_SKILL = 20;
export const MIN_USER_SKILL = 3;

@Entity()
@Unique(['skill', 'user'])
export class UserSkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => SkillEntity)
    skill: SkillEntity;

    @Column({ default: 1 })
    level: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}