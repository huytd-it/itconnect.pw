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
import {PositionEntity} from "./position.entity";
import {CvWorkExperiencePositionEntity} from "./cvWorkExperiencePosition.entity";

export const MAX_POSITION_SKILL = 20;
export const MIN_POSITION_SKILL = 3;

@Entity()
@Unique(['position', 'user'])
export class UserTaggedPositionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => PositionEntity)
    position: PositionEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}