import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserPositionEntity} from "./userPosition.entity";
import {CvEducationEntity} from "./cvEducation.entity";

export const MAX_SCHOOL_NAME_LENGTH = 255;
export const MIN_SCHOOL_NAME_LENGTH = 1;

@Entity()
export class SchoolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @OneToMany(type => CvEducationEntity, db => db.school)
    cvEducations: CvEducationEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}