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
}

export const POINT_DEFAULT = 10;
export const POINT_MAX_USER_PER_TICK = 10000;

@Entity()
export class PointConfigEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['type'])
    type: PointConfigType;

    @Column()
    point: number;
}