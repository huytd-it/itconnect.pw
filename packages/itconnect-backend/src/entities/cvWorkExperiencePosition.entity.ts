import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";
import {PositionEntity} from "./position.entity";

export const MAX_WORK_EXPERIENCE_POSITION = 20;
export const MIN_WORK_EXPERIENCE_POSITION = 1;

@Entity()
@Unique(['cvWorkExperience', 'position'])
export class CvWorkExperiencePositionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => CvWorkExperienceEntity)
    cvWorkExperience: CvWorkExperienceEntity;

    @ManyToOne(type => PositionEntity)
    position: PositionEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}