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
    @JoinColumn()
    userInfo: UserInfoEntity;

    @OneToMany(type => UserSkillEntity, userSkill => userSkill.user)
    userSkills: SkillEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}