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
import {CvSecDataRowEntity} from "./cvSecDataRow.entity";


@Entity()
export class CvSecDataEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => CvSecBuilderEntity)
    cvSecBuilder: CvSecBuilderEntity;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @OneToMany(type => CvSecDataRowEntity, db => db.cvSecData)
    cvSecDataRows: CvSecDataRowEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}