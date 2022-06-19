import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class cvSecBuilderSectionControlTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: number;

    @Column()
    @Index()
    isGlobal: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}