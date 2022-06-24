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
import {SchoolEntity} from "./school.entity";
import {JobEntity} from "./job.entity";


@Entity()
@Unique(['school', 'job'])
export class JobSchoolEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => JobEntity)
    job: JobEntity;

    @ManyToOne(type => SchoolEntity)
    school: SchoolEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}