import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, Index,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {PositionEntity} from "./position.entity";
import {CvWorkExperiencePositionEntity} from "./cvWorkExperiencePosition.entity";
import {CertificateEntity} from "./certificate.entity";

@Entity()
@Unique(['certificate', 'user'])
export class JobCertificateEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => CertificateEntity)
    certificate: CertificateEntity;

    @Column({ default: 1 })
    levelMin: number;

    @Column({ default: 10 })
    levelMax: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}