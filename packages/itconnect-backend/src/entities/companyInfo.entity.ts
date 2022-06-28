import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, Index, JoinColumn,
    ManyToOne, OneToMany,
    OneToOne,
    PrimaryColumn, PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {AddressEntity} from "./address.entity";
import {CompanyTagEntity} from "./companyTag.entity";


@Entity()
export class CompanyInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity, user => user.companyInfo)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(type => AddressEntity)
    @JoinColumn()
    addressProvince: AddressEntity;

    @ManyToOne(type => AddressEntity)
    @JoinColumn()
    addressDistrict: AddressEntity;

    @ManyToOne(type => AddressEntity)
    @JoinColumn()
    addressVillage: AddressEntity;

    @OneToOne(type => CompanyTagEntity)
    companyTag: CompanyTagEntity;

    @Column()
    addressStreet: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    @Unique(['mst'])
    mst: string;

    @Column()
    // @Index({ fulltext: true })
    companyName: string;

    @Column()
    dayEstablish: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}