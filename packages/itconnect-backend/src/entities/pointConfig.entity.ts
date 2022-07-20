import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

export enum PointConfigType {
    Skill = 'skill',
    Position = 'position',
    Certificate = 'certificate',
    School = 'school',
    WorkFrom = 'workFrom',
    JobLevel = 'jobLevel',
    JobType = 'jobType',
    Yoe = 'yoe',
    AllowTagged = 'allow_tagged',
    LimitSuggest = 'limit_suggest'
}

export const POINT_DEFAULT = 50;
export const POINT_EXT_DEFAULT = 60;
export const POINT_EXT_VERIFIED_DEFAULT = 70;
export const POINT_MAX_USER_PER_TICK = 10000;

@Entity()
export class PointConfigEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['type'])
    type: PointConfigType;

    @Column({ nullable: true })
    point: number;

    @Column({ nullable: true })
    pointExp: number;

    @Column({ nullable: true })
    pointExpVerified: number;
}