import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {EducationEntity} from "./education.entity";

@Entity()
export class RankedAcademicEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => EducationEntity, db => db.rankedAcademic)
    educations: EducationEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}