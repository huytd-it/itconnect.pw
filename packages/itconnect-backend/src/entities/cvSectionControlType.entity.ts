import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {CvSecBuilderSectionControlTypeEntity} from "./cvSecBuilderSectionControlType.entity";
import {UserEntity} from "./user.entity";


@Entity()
export class CvSectionControlTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    @Unique('tag_unique', ['tag'])
    tag: string;

    @OneToMany(type => CvSecBuilderSectionControlTypeEntity, db => db.cvSectionControlType)
    cvSecBuilderSectionControlTypes: CvSecBuilderSectionControlTypeEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}