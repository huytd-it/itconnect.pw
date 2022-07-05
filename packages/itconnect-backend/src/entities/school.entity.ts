import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserPositionEntity} from "./userPosition.entity";
import {CvEducationEntity} from "./cvEducation.entity";
import {UserSkillEntity} from "./userSkill.entity";
import {UserSchoolEntity} from "./userSchool.entity";
import {UserTaggedSchoolEntity} from "./userTaggedSchool.entity";
import {JobSchoolEntity} from "./jobSchool.entity";

export const MAX_SCHOOL_NAME_LENGTH = 255;
export const MIN_SCHOOL_NAME_LENGTH = 1;

@Entity()
export class SchoolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['name'])
    // @Index({ fulltext: true })
    name: string;

    @Column({ default: false })
    @Index()
    isApprove: boolean;

    @OneToMany(type => UserSchoolEntity, db => db.school)
    userSchools: UserSchoolEntity[]
    userSchoolCount: number

    @OneToMany(type => JobSchoolEntity, db => db.school)
    jobSchools: UserSchoolEntity[]
    jobSchoolCount: number

    @OneToMany(type => UserTaggedSchoolEntity, db => db.school)
    userTaggedSchools: UserTaggedSchoolEntity[]

    @OneToMany(type => CvEducationEntity, db => db.school)
    cvEducations: CvEducationEntity[]
    cvEducationCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}