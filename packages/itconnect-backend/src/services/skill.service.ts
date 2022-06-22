import {ConflictException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindOptionsWhere, In, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SkillEntity} from "../entities/skill.entity";
import {SkillCreateDto, SkillSearchInputDto} from "../dtos/skill.dto";
import {Approve, DeleteParamsDto} from "../dtos/abstract.dto";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {hasUserTagged} from "../polices/permission.enum";
import {UserTaggedSkillEntity} from "../entities/userTaggedSkill.entity";

@Injectable({ scope: Scope.REQUEST })
export class SkillService {

    constructor(
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>,
        @InjectRepository(UserTaggedSkillEntity)
        private userTaggedSkillRepository: Repository<UserTaggedSkillEntity>,
        @Inject(REQUEST) private request: Request
    ) {
    }

    // without is global
    isOwner(skillId: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.userTaggedSkillRepository.findOne({
            where: {
                user: { id: currentUser.id },
                skill: { id: skillId }
            }
        })
    }

    isApprove(skillId: number) {
        return this.skillRepository.findOne({
            where: {
                id: skillId,
                isApprove: true
            }
        })
    }

    async search(dtoSearch: SkillSearchInputDto, dtoPage: PageOptionsDto) {
        const query = this.skillRepository.createQueryBuilder('skill');
        query.select('skill.*');

        const whereClause: FindOptionsWhere<SkillEntity> = {};
        if (dtoSearch.search) {
            whereClause.name = Like(`%${dtoSearch.search}%`);
        }
        if (dtoSearch.approve && (dtoSearch.approve == Approve.True || dtoSearch.approve == Approve.False)) {
            whereClause.isApprove = dtoSearch.approve == Approve.True;
        }
        query.where(whereClause);

        // owner tag
        const currentUser = this.request['user'] as UserEntity;
        if (hasUserTagged(currentUser)) {
            const userTagged = await this.userTaggedSkillRepository.find({
                where: {
                    user: {
                        id: currentUser.id
                    }
                },
                loadRelationIds: true
            });
            if (userTagged.length) {
                query.andWhere((clause) => {
                    clause.where({
                        id: In(userTagged.map(item => item.skill))
                    })
                    clause.orWhere({
                        isApprove: true
                    })
                })
            }
        }

        if (dtoPage.order && dtoPage.order_field) {
            query.orderBy(dtoPage.order_field, dtoPage.order)
        }

        // count all data
        const total = await query.getCount();

        // query data
        query.skip(dtoPage.skip);
        query.take(dtoPage.take);
        const result = await query.execute();

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }

    async create(data: SkillCreateDto) {
        const name = data.name;
        let skill = await this.skillRepository.findOne({
            where: { name }
        })

        const currentUser = this.request['user'] as UserEntity;

        // create owner
        if (hasUserTagged(currentUser)) {
            if (!skill) {
                skill = await this.skillRepository.save({ name });
            }
            const data = {
                user: {
                    id: currentUser.id
                },
                skill: {
                    id: skill.id
                }
            };
            const skillTagged = await this.userTaggedSkillRepository.findOne({
                where: data
            })
            if (skillTagged) {
                throw new ConflictException('Skill is exists');
            }
            await this.userTaggedSkillRepository.save(data)
        } else {
            throw new ConflictException('Skill is exists');
        }

        return skill;
    }
}
