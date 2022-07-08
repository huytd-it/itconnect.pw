import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {JobEntity} from "./job.entity";

export enum NotificationType {
    test = 'test'
}

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: NotificationType;

    @Column({ nullable: true })
    msg: string;

    @ManyToOne(type => UserEntity)
    user: UserEntity

    @ManyToOne(type => UserEntity)
    userTarget: UserEntity

    @ManyToOne(type => JobEntity)
    jobTarget: UserEntity
}