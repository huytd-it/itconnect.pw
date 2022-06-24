import {ConflictException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PositionEntity} from "../entities/position.entity";
import {FindManyOptions, FindOptionsWhere, In, Like, Repository} from "typeorm";
import {SkillDto, SkillSearchInputDto} from "../dtos/skill.dto";
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {PositionCreateDto, PositionDto, PositionSearchInputDto} from "../dtos/position.dto";
import {UserEntity} from "../entities/user.entity";
import {hasUserTagged} from "../polices/permission.enum";
import {UserTaggedPositionEntity} from "../entities/userTaggedPosition.entity";
import {REQUEST} from "@nestjs/core";
import {SkillEntity} from "../entities/skill.entity";
import {Approve} from "../dtos/abstract.dto";

@Injectable({ scope: Scope.REQUEST })
export class PositionService {

    constructor(
        @InjectRepository(PositionEntity)
        private positionRepository: Repository<PositionEntity>,
        @InjectRepository(UserTaggedPositionEntity)
        private userTaggedPositionRepository: Repository<UserTaggedPositionEntity>,
        @Inject(REQUEST) private request: Request
    ) {
    }

    // without is global
    isOwner(positionId: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.userTaggedPositionRepository.findOne({
            where: {
                user: { id: currentUser.id },
                position: { id: positionId }
            }
        })
    }

    isApprove(positionId: number) {
        return this.positionRepository.findOne({
            where: {
                id: positionId,
                isApprove: true
            }
        })
    }

    async search(dtoSearch: PositionSearchInputDto, dtoPage: PageOptionsDto) {
        const query = this.positionRepository.createQueryBuilder('position');
        query.select('position.*');

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
            const userTagged = await this.userTaggedPositionRepository.find({
                where: {
                    user: {
                        id: currentUser.id
                    }
                },
                loadRelationIds: true
            });
            if (userTagged.length) {
                console.log(userTagged);
                query.andWhere((clause) => {
                    clause.where({
                        id: In(userTagged.map(item => item.position))
                    })
                    clause.orWhere({
                        isApprove: true
                    })
                })
            } else {
                query.andWhere({
                    isApprove: true
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

    async create(data: PositionCreateDto) {
        const name = data.name;
        let position = await this.positionRepository.findOne({
            where: { name }
        })

        const currentUser = this.request['user'] as UserEntity;

        // create owner
        if (hasUserTagged(currentUser)) {
            if (!position) {
                position = await this.positionRepository.save({ name });
            }
            const data = {
                user: {
                    id: currentUser.id
                },
                position: {
                    id: position.id
                }
            };
            const skillTagged = await this.userTaggedPositionRepository.findOne({
                where: data
            })
            if (skillTagged) {
                throw new ConflictException('Position is exists');
            }
            await this.userTaggedPositionRepository.save(data)
        } else {
            throw new ConflictException('Position is exists');
        }

        return position;
    }
}
