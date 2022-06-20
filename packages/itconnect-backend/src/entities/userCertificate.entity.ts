import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
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
export class UserCertificateEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 1 })
    level: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => CertificateEntity)
    certificate!: CertificateEntity;

    @OneToMany(type => CvWorkExperienceSkillEntity, db => db.userSkill)
    cvWorkExperienceSkills: CvWorkExperienceSkillEntity[];

    @OneToMany(type => CvCertificateEntity, db => db.userCertificate)
    cvCertificates: CvCertificateEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}