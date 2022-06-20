import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";

export const MAX_ACTIVITY_CONTENT_LENGTH = 65000;

@Entity()
export class CvActivitiesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column({ length: MAX_ACTIVITY_CONTENT_LENGTH })
    content: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}