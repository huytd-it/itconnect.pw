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
import {UserSchoolEntity} from "./userSchool.entity";

export const MAX_EDUCATION_CONTENT_LENGTH = 65000;

@Entity()
export class CvEducationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mark: number;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(type => RankedAcademicEntity)
    rankedAcademic: RankedAcademicEntity;

    @ManyToOne(type => SchoolEntity)
    school: SchoolEntity;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}