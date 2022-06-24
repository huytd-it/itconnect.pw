import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, Index,
    ManyToOne, OneToMany, PrimaryColumn,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {SkillEntity} from "./skill.entity";
import {CvWorkExperiencePositionEntity} from "./cvWorkExperiencePosition.entity";
import {PositionEntity} from "./position.entity";
import {CvWorkExperienceSkillEntity} from "./cvWorkExperienceSkill.entity";
import {CertificateEntity} from "./certificate.entity";
import {CvCertificateEntity} from "./cvCertificate.entity";

export const MAX_USER_CERTIFICATE = 20;
export const MIN_USER_CERTIFICATE = 3;

@Entity()
@Unique(['user', 'certificate'])
export class UserCertificateEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => CertificateEntity)
    certificate: CertificateEntity;

    @Column({ default: 1 })
    level: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}