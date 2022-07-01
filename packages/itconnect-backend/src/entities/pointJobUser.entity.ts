import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {UserEntity} from "./user.entity";
import {JobEntity} from "./job.entity";


@Entity()
@Unique(['job', 'user'])
@Index(['job', 'pointTotal'])
@Index(['user', 'pointTotal'])
export class PointJobUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => JobEntity)
    job: JobEntity;

    @Column()
    @Index()
    pointTotal: number;

    @Column()
    pointSkill: number;

    @Column()
    pointPosition: number;

    @Column()
    pointCertificate: number;

    @Column()
    pointSchool: number;

    @Column()
    pointWorkFrom: number;

    @Column()
    pointLevelJob: number;

    @Column()
    pointLevelType: number;

    @Column()
    pointYoe: number;
}