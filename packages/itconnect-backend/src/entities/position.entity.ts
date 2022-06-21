import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Unique
} from "typeorm";
import {UserPositionEntity} from "./userPosition.entity";
import {CvWorkExperienceEntity} from "./cvWorkExperience.entity";
import {CvWorkExperiencePositionEntity} from "./cvWorkExperiencePosition.entity";
import {UserTaggedCertificateEntity} from "./userTaggedCertificate.entity";
import {UserTaggedPositionEntity} from "./userTaggedPosition.entity";

export const MAX_POSITION_NAME_LENGTH = 20;
export const MIN_POSITION_NAME_LENGTH = 1;

@Entity()
export class PositionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['name'])
    name: string;

    @Column({ default: false })
    @Index()
    isApprove: boolean;

    @OneToMany(type => UserPositionEntity, db => db.position)
    userPositions: UserPositionEntity[]

    @OneToMany(type => UserTaggedPositionEntity, db => db.position)
    userTaggedPositions: UserTaggedPositionEntity[]

    @OneToMany(type => CvWorkExperiencePositionEntity, db => db.position)
    cvWorkExperiencePositions: PositionEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}