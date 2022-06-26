import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity, Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Unique
} from "typeorm";
import {CvEducationEntity} from "./cvEducation.entity";

@Entity()
export class RankedAcademicEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Unique(['name'])
    // @Index({ fulltext: true })
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