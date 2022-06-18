import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserSkillEntity} from "./userSkill.entity";
import {UserPositionEntity} from "./userPosition.entity";

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