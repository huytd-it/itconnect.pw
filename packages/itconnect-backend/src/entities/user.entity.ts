import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {AppRole} from "../polices/permission.enum";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    email: string;

    @Column()
    password: string;

    @Column({ default: AppRole.Begin })
    @Index()
    role: AppRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}