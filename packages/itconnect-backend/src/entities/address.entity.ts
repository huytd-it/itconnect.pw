import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn, Unique, UpdateDateColumn
} from "typeorm";

export enum EAddressType {
    province = 1,
    district = 2,
    village = 3
}

@Entity()
@Unique(['name', 'type'])
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    @Index()
    type: EAddressType;

    @ManyToOne(type => AddressEntity)
    parent: AddressEntity;

    @OneToMany(type => AddressEntity, address => address.parent)
    childrens: AddressEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}