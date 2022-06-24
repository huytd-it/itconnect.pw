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
import {SkillEntity} from "./skill.entity";
import {WorkFromEntity} from "./workFrom.entity";


@Entity()
@Unique(['workFrom', 'user'])
export class JobWorkFromEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => WorkFromEntity)
    workFrom: WorkFromEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}