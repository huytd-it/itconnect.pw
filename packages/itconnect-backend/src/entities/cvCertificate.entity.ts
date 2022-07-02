import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Unique, OneToOne
} from "typeorm";
import {UserEntity} from "./user.entity";
import {UserCertificateEntity} from "./userCertificate.entity";
import {CertificateEntity} from "./certificate.entity";

export const MAX_CERTIFICATE_CONTENT_LENGTH = 20000;

@Entity()
@Unique(['user', 'certificate'])
export class CvCertificateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(type => CertificateEntity)
    certificate: CertificateEntity;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}