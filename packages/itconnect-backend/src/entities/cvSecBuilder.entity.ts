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
import {CvSecDataEntity} from "./cvSecData.entity";

@Entity()
@Unique('userId_name_unique', ['name', 'user'])
export class CvSecBuilderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: number;

    @Column()
    @Unique('tag_unique', ['tag_name'])
    tag: string;

    @Column({ default: 1 })
    max_data_row: number;

    @Column()
    @Index()
    isGlobal: boolean;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @OneToMany(type => CvSecBuilderSectionControlTypeEntity, db => db.cvSecBuilder)
    cvSecBuilderSectionControlTypes: CvSecBuilderSectionControlTypeEntity[];

    @OneToMany(type => CvSecDataEntity, db => db.cvSecBuilder)
    cvSecData: CvSecDataEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}