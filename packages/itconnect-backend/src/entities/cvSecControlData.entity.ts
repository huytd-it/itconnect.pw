import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CvSecBuilderEntity} from "./cvSecBuilder.entity";
import {UserEntity} from "./user.entity";
import {CvSecDataEntity} from "./cvSecData.entity";
import {CvSecBuilderSectionControlTypeEntity} from "./cvSecBuilderSectionControlType.entity";
import {CvSecDataRowEntity} from "./cvSecDataRow.entity";
import {CvSecControlDataSkillEntity} from "./cvSecControlDataSkill.entity";
import {CvSecControlDataPositionEntity} from "./cvSecControlDataPosition.entity";
import {CvSecControlDataJobLevelEntity} from "./cvSecControlDataJobLevel.entity";
import {CvSecControlDataWorkFromEntity} from "./cvSecControlDataWorkFrom.entity";

@Entity()
export class CvSecControlDataEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => CvSecDataRowEntity)
    cvSecDataRow: CvSecDataRowEntity;

    @ManyToOne(type => CvSecBuilderSectionControlTypeEntity)
    cvSecBuilderSectionControlType: CvSecBuilderSectionControlTypeEntity;

    @OneToMany(type => CvSecControlDataSkillEntity, db => db.cvSecControlData)
    cvSecControlDataSkills: CvSecControlDataSkillEntity[];

    @OneToMany(type => CvSecControlDataPositionEntity, db => db.cvSecControlData)
    cvSecControlDataPositions: CvSecControlDataPositionEntity[];

    @OneToMany(type => CvSecControlDataJobLevelEntity, db => db.cvSecControlData)
    cvSecControlDataJobLevels: CvSecControlDataJobLevelEntity[];

    @OneToMany(type => CvSecControlDataWorkFromEntity, db => db.cvSecControlData)
    cvSecControlDataWorkFromEntity: CvSecControlDataWorkFromEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}