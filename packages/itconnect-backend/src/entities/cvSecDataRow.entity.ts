import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CvSecBuilderEntity} from "./cvSecBuilder.entity";
import {UserEntity} from "./user.entity";
import {CvSecControlDataEntity} from "./cvSecControlData.entity";
import {CvSecDataEntity} from "./cvSecData.entity";


@Entity()
export class CvSecDataRowEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => CvSecDataEntity)
    cvSecData: CvSecDataEntity;

    @OneToMany(type => CvSecControlDataEntity, db => db.cvSecDataRow)
    cvSecControlData: CvSecControlDataEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}