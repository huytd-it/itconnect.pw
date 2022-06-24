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
import {JobEntity} from "./job.entity";


@Entity()
@Unique(['skill', 'job'])
export class JobSkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => JobEntity)
    job: JobEntity;

    @ManyToOne(type => SkillEntity)
    skill: SkillEntity;

    @Column({ default: 1 })
    levelMin: number;

    @Column({ default: 10 })
    levelMax: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}