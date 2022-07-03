import {CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {JobEntity} from "./job.entity";

@Entity()
export class JobViewLogEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => JobEntity)
    job: JobEntity;

    @CreateDateColumn()
    createdAt: Date;
}