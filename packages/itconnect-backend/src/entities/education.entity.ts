import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {RankedAcademicEntity} from "./rankedAcademic.entity";
import {SchoolEntity} from "./school.entity";
import {UserEntity} from "./user.entity";


@Entity()
export class EducationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mark: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(type => RankedAcademicEntity)
    rankedAcademic: RankedAcademicEntity;

    @ManyToOne(type => SchoolEntity)
    school: SchoolEntity[];

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}