import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CvEducationEntity} from "./cvEducation.entity";

@Entity()
export class RankedAcademicEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => CvEducationEntity, db => db.rankedAcademic)
    cvEducations: CvEducationEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}