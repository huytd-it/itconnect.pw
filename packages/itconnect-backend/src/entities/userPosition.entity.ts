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
import {PositionEntity} from "./position.entity";

export const MAX_POSITION_SKILL = 20;
export const MIN_POSITION_SKILL = 3;

@Entity()
export class UserPositionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => PositionEntity)
    position!: PositionEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}