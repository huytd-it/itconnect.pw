import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserPositionEntity} from "./userPosition.entity";

export const MAX_JOB_LEVEL_NAME_LENGTH = 20;
export const MIN_JOB_LEVEL_NAME_LENGTH = 1;

@Entity()
export class JobLevelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    // @ManyToOne(type => UserPositionEntity, userPosition => userPosition.position)
    // userPositions: UserPositionEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}