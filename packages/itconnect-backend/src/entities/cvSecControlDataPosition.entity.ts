import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CvSecBuilderEntity} from "./cvSecBuilder.entity";
import {UserEntity} from "./user.entity";
import {CvSecDataEntity} from "./cvSecData.entity";
import {CvSecBuilderSectionControlTypeEntity} from "./cvSecBuilderSectionControlType.entity";
import {CvSecDataRowEntity} from "./cvSecDataRow.entity";
import {CvSecControlDataEntity} from "./cvSecControlData.entity";
import {SkillEntity} from "./skill.entity";
import {PositionEntity} from "./position.entity";

@Entity()
export class CvSecControlDataPositionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @Column({ default: 1 })
    level: number;

    @ManyToOne(type => CvSecControlDataEntity)
    cvSecControlData: CvSecControlDataEntity;

    @ManyToOne(type => PositionEntity)
    position: PositionEntity;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}