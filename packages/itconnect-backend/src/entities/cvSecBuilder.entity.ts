import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {CvSecBuilderSectionControlTypeEntity} from "./cvSecBuilderSectionControlType.entity";

@Entity()
@Unique('userId_name_unique', ['name', 'user'])
export class CvSecBuilderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: number;

    @Column()
    @Index()
    isGlobal: boolean;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @OneToMany(type => CvSecBuilderSectionControlTypeEntity, db => db.cvSecBuilder)
    cvSecBuilderSectionControlTypes: CvSecBuilderSectionControlTypeEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}