import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    OneToOne,
    PrimaryColumn, PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";
import {AddressEntity} from "./address.entity";
import {JobLevelEntity} from "./jobLevel.entity";

export const MAX_USER_INFO_INTEREST_LENGTH = 65000;
export const MAX_USER_INFO_OBJECTIVE_LENGTH = 65000;

@Entity()
export class UserInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity, user => user.userInfo)
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

    @Column()
    addressStreet: string;

    @Column({ nullable: true })
    phone: string;

    @Column()
    fullName: string;

    @Column()
    birthday: Date;

    @Column({  nullable: true, type: 'text' })
    interest: string;

    @Column({ nullable: true, type: 'text' })
    objective: string;

    @ManyToOne(type => JobLevelEntity)
    jobLevel: JobLevelEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}