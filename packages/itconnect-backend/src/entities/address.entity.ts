import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";

export enum EAddressType {
    province = 1,
    district = 2,
    village = 3
}

@Entity()
@Index(['name', 'type'])
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Index()
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