import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Unique
} from "typeorm";
import {UserEntity} from "./user.entity";
import {UserCertificateEntity} from "./userCertificate.entity";
import {CertificateEntity} from "./certificate.entity";

export const MAX_CERTIFICATE_CONTENT_LENGTH = 65000;

@Entity()
@Unique(['user', 'certificate'])
export class CvCertificateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({ type: 'text' })
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