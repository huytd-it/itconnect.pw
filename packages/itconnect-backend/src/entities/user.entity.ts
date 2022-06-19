import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, JoinColumn, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {AppRole} from "../polices/permission.enum";
import {UserSkillEntity} from "./userSkill.entity";
import {SkillEntity} from "./skill.entity";
import {UserInfoEntity} from "./userInfo.entity";
import {CompanyInfoEntity} from "./companyInfo.entity";
import {CvSecBuilderEntity} from "./cvSecBuilder.entity";
import {CvSecDataEntity} from "./cvSecData.entity";
import {CvSecControlDataSkillEntity} from "./cvSecControlDataSkill.entity";
import {CvSecControlDataPositionEntity} from "./cvSecControlDataPosition.entity";
import {CvSecControlDataJobLevelEntity} from "./cvSecControlDataJobLevel.entity";
import {CvSecControlDataWorkFromEntity} from "./cvSecControlDataWorkFrom.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    email: string;

    @Column()
    password: string;

    @Column({ default: AppRole.begin })
    @Index()
    role: AppRole;

    @OneToOne(type => UserInfoEntity)
    userInfo: UserInfoEntity;

    @OneToOne(type => CompanyInfoEntity)
    companyInfo: CompanyInfoEntity;

    @OneToMany(type => UserSkillEntity, userSkill => userSkill.user)
    userSkills: SkillEntity[];

    @OneToMany(type => CvSecBuilderEntity, tb => tb.user)
    cvSecBuilders: CvSecBuilderEntity[];

    @OneToMany(type => CvSecDataEntity, tb => tb.user)
    cvSecData: CvSecDataEntity[];

    @OneToMany(type => CvSecControlDataSkillEntity, db => db.user)
    cvSecControlDataSkills: CvSecControlDataSkillEntity[];

    @OneToMany(type => CvSecControlDataPositionEntity, db => db.user)
    cvSecControlDataPositions: CvSecControlDataPositionEntity[];

    @OneToMany(type => CvSecControlDataJobLevelEntity, db => db.user)
    cvSecControlDataJobLevels: CvSecControlDataJobLevelEntity[];

    @OneToMany(type => CvSecControlDataWorkFromEntity, db => db.user)
    cvSecControlDataWorkFromEntity: CvSecControlDataWorkFromEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}