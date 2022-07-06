import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {JobEntity} from "./job.entity";
import {UserEntity} from "./user.entity";

export enum JobApplyStatus {
    Waiting = 'waiting', // for user
    Denide = 'denide', // for company
    RequestJoin = 'request_join', // for company
    RequestDenide = 'request_denide', // for user
    RequestAccept = 'request_accept', // for user
}

@Entity()
export class JobApplyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => JobEntity)
    job: JobEntity;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @Column({ default: JobApplyStatus.Waiting })
    status: JobApplyStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}