import {ConflictException, ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {CreateOrEditUserSkillDto} from "../dtos/user-skill.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserSkillEntity} from "../entities/userSkill.entity";
import {Repository} from "typeorm";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {PointJobUserService} from "./point-job-user.service";
import {PointJobUserQueue} from "../queues/point-job-user.queue";

@Injectable({ scope: Scope.REQUEST })
export class UserSkillService {

    constructor(
        @InjectRepository(UserSkillEntity)
        private userSkillEntity: Repository<UserSkillEntity>,
        @Inject(REQUEST) private request: Request,
        private pointJobUserQueue: PointJobUserQueue,
    ) {
    }

    getAll() {
        const currentUser = this.request['user'] as UserEntity;
        return this.userSkillEntity.find({
            where: {
              user: {
                  id: currentUser.id
              }
            },
            relations: ['skill']
        });
    }

    async createOrEdit(dto: CreateOrEditUserSkillDto) {
        const currentUser = this.request['user'] as UserEntity;
        let upId = dto.id;

        if (dto.id) {
            const data = await this.userSkillEntity.findOne({
                where: {
                    id: dto.id,
                    user: {
                        id: currentUser.id
                    }
                },
                loadRelationIds: true
            });
            if (data) {
                const userSkill = await this.userSkillEntity.update(
                    { id: dto.id },
                    {
                        level: dto.level
                    }
                )
            } else {
                throw new ForbiddenException();
            }
        } else {
            const exists = await this.userSkillEntity.findOne({
                where: {
                    user: {
                        id: currentUser.id
                    },
                    skill: {
                        id: dto.skill
                    }
                },
                relations: ['skill']
            })
            if (exists) {
                throw new ConflictException(`${exists.skill.name} đã tồn tại`);
            }
            const r = await this.userSkillEntity.save([
                {
                    level: dto.level,
                    user: currentUser,
                    skill: {
                        id: dto.skill
                    }
                }
            ])
            upId = r[0].id;
        }

        await this.pointJobUserQueue.registerComputeUser(currentUser.id);

        return await this.userSkillEntity.findOne({
            where: { id: upId },
            relations: ['skill']
        })
    }

    async delete(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        const exists = await this.userSkillEntity.findOne({
            where: {
                user: { id: currentUser.id },
                id
            }
        })
        if (exists) {
            const r = await this.userSkillEntity.delete(id);
            await this.pointJobUserQueue.registerComputeUser(currentUser.id);
            return r;
        }

        throw new ForbiddenException();
    }
}
