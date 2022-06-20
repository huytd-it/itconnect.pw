import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserSkillEntity} from "./userSkill.entity";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";
import {UserCertificateEntity} from "./userCertificate.entity";

export const MAX_CERTIFICATE_NAME_LENGTH = 20;
export const MIN_CERTIFICATE_NAME_LENGTH = 1;

@Entity()
export class CertificateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @OneToMany(type => UserCertificateEntity, db => db.certificate)
    userCertificates: UserCertificateEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}