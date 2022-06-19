import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {SkillEntity} from "./skill.entity";
import {CvSecBuilderEntity} from "./cvSecBuilder.entity";
import {CvSectionControlTypeEntity} from "./cvSectionControlType.entity";
import {CvSecControlDataEntity} from "./cvSecControlData.entity";
import {CvControlSelectTypeEntity} from "./cvControlSelectType.entity";

@Entity()
export class CvSecBuilderSectionControlTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    orderPosition: number;

    @ManyToOne(type => CvControlSelectTypeEntity)
    cvControlSelectType: CvControlSelectTypeEntity;

    @ManyToOne(type => CvSecBuilderEntity)
    cvSecBuilder: CvSecBuilderEntity;

    @ManyToOne(type => CvSectionControlTypeEntity)
    cvSectionControlType: CvSectionControlTypeEntity;

    @OneToMany(type => CvSecControlDataEntity, db => db.cvSecBuilderSectionControlType)
    cvSecControlData: CvSecControlDataEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}