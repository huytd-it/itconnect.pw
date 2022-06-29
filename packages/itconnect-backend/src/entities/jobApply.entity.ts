import {CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {JobEntity} from "./job.entity";
import {UserEntity} from "./user.entity";


@Entity()
export class JobApplyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => JobEntity)
    job: JobEntity;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}