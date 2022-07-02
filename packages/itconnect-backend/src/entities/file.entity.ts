import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity, Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";


@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false })
    path: string;

    @Column()
    mime: string;

    @Column()
    size: number;

    @Column()
    @Index()
    slug: string;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}