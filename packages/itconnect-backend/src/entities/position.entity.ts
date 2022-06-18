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

export const MAX_POSITION_NAME_LENGTH = 20;
export const MIN_POSITION_NAME_LENGTH = 1;

@Entity()
export class PositionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @ManyToOne(type => UserPositionEntity, userPosition => userPosition.position)
    userPositions: UserPositionEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}