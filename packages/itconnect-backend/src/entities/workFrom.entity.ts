import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";

export const MAX_WORK_FROM_NAME_LENGTH = 20;
export const MIN_WORK_FROM_NAME_LENGTH = 1;

@Entity()
export class WorkFromEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['name'])
    @Index({ fulltext: true })
    name: string;

    @OneToMany(type => CvWorkExperienceEntity, db => db.jobLevel)
    cvWorkExperiences: CvWorkExperienceEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}