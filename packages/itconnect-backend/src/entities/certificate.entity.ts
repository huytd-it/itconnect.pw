import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserCertificateEntity} from "./userCertificate.entity";
import {CvCertificateEntity} from "./cvCertificate.entity";
import {UserTaggedCertificateEntity} from "./userTaggedCertificate.entity";

export const MAX_CERTIFICATE_NAME_LENGTH = 20;
export const MIN_CERTIFICATE_NAME_LENGTH = 1;

@Entity()
export class CertificateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['name'])
    // @Index({ fulltext: true })
    name: string;

    @Column({ default: false })
    @Index()
    isApprove: boolean;

    @OneToMany(type => UserCertificateEntity, db => db.certificate)
    userCertificates: UserCertificateEntity[]

    @OneToMany(type => UserTaggedCertificateEntity, db => db.certificate)
    userTaggedCertificates: UserTaggedCertificateEntity[]

    @OneToMany(type => CvCertificateEntity, db => db.certificate)
    cvCertificates: CvCertificateEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}