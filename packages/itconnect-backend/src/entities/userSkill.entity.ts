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

export const MAX_USER_SKILL = 20;
export const MIN_USER_SKILL = 3;

@Entity()
export class UserSkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 1 })
    level: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => SkillEntity)
    skill!: SkillEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}