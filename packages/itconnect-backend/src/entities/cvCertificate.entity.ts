import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {CompanyInfoEntity} from "./companyInfo.entity";
import {PositionEntity} from "./position.entity";
import {SkillEntity} from "./skill.entity";
import {JobLevelEntity} from "./jobLevel.entity";
import {WorkFromEntity} from "./workFrom.entity";
import {CvWorkExperienceSkillEntity} from "./cvWorkExperienceSkill.entity";
import {CvWorkExperiencePositionEntity} from "./cvWorkExperiencePosition.entity";
import {UserCertificateEntity} from "./userCertificate.entity";

export const MAX_CERTIFICATE_CONTENT_LENGTH = 65000;

@Entity()
export class CvCertificateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({ length: MAX_CERTIFICATE_CONTENT_LENGTH })
    content: string;

    @ManyToOne(type => UserCertificateEntity)
    userCertificate: UserCertificateEntity;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}