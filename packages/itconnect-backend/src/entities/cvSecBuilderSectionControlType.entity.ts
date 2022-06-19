import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {SkillEntity} from "./skill.entity";
import {CvSecBuilderEntity} from "./cvSecBuilder.entity";
import {CvSectionControlTypeEntity} from "./cvSectionControlType.entity";

@Entity()
export class CvSecBuilderSectionControlTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: number;

    @ManyToOne(type => CvSecBuilderEntity)
    cvSecBuilder: CvSecBuilderEntity;

    @ManyToOne(type => CvSectionControlTypeEntity)
    cvSectionControlType: CvSectionControlTypeEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}