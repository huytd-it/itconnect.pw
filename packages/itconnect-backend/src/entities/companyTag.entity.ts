import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, JoinColumn, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserTaggedCompanyTagEntity} from "./userTaggedCompanyTag.entity";
import {CompanyInfoEntity} from "./companyInfo.entity";

export const MAX_COMPANY_TAG_NAME_LENGTH = 255;
export const MIN_COMPANY_TAG_NAME_LENGTH = 1;

@Entity()
export class CompanyTagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['name'])
    // @Index({ fulltext: true })
    name: string;

    @Column({ nullable: true })
    @Unique(['mst'])
    mst: string;

    @Column({ default: false })
    @Index()
    isApprove: boolean;

    @OneToOne(type => CompanyInfoEntity)
    @JoinColumn()
    companyInfo: CompanyInfoEntity;

    @OneToMany(type => UserTaggedCompanyTagEntity, db => db.companyTag)
    userTaggedCompanyTags: UserTaggedCompanyTagEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}