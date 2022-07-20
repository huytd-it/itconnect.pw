import {ConflictException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PositionEntity} from "../entities/position.entity";
import {FindManyOptions, FindOptionsWhere, In, Like, Repository} from "typeorm";
import {CreateOrEditTag, PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {PositionCreateDto, PositionDto, PositionSearchInputDto} from "../dtos/position.dto";
import {UserEntity} from "../entities/user.entity";
import {hasUserTagged} from "../polices/permission.enum";
import {UserTaggedPositionEntity} from "../entities/userTaggedPosition.entity";
import {REQUEST} from "@nestjs/core";
import {SkillEntity} from "../entities/skill.entity";
import {Approve} from "../dtos/abstract.dto";
import {UserPositionEntity} from "../entities/userPosition.entity";
import {JobPositionEntity} from "../entities/jobPosition.entity";
import {JobEntity, JobStatus} from "../entities/job.entity";
import * as moment from "moment";
import {PointConfigService} from "./point-config.service";

@Injectable({ scope: Scope.REQUEST })
export class PositionService {

    constructor(
        @InjectRepository(PositionEntity)
        private positionRepository: Repository<PositionEntity>,
        @InjectRepository(UserTaggedPositionEntity)
        private userTaggedPositionRepository: Repository<UserTaggedPositionEntity>,
        @Inject(REQUEST) private request: Request,
        private pointConfigService: PointConfigService
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
        query.andWhere(whereClause);

        const config = await this.pointConfigService.getConfig();
        if (config.allow_tagged.point) {
            dtoSearch.all = 'true'
        }

        // owner tag
        const currentUser = this.request['user'] as UserEntity;
        if (hasUserTagged(currentUser) && !whereClause.isApprove && dtoSearch.all !== 'true') {
            const userTagged = await this.userTaggedPositionRepository.find({
                where: {
                    user: {
                        id: currentUser.id
                    }
                },
                loadRelationIds: true
            });
            if (userTagged.length) {
                query.andWhere(`
                    (position.id in (:prm_ids) or
                    (position.id not in (:prm_ids) and position.isApprove = 1))
                `, {
                    prm_ids: userTagged.map(item => item.position)
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

        // count
        query.loadRelationCountAndMap(
            'position.jobPositionCount',
            'position.jobPositions',
            'jobPositionCount'
        )
        query.loadRelationCountAndMap(
            'position.userPositionCount',
            'position.userPositions',
            'userPositionCount'
        )
        query.loadRelationCountAndMap(
            'position.jobActivePositionCount',
            'position.jobActivePositions',
            'jobActivePositionCount'
        )


        // fast fix mapping count
        // need update
        query.addSelect((qb) => {
            return qb.select('COUNT(*)', 'userPositionCount')
                .from(UserPositionEntity, 'jk')
                .where('jk.positionId = position.id');
        }, 'userPositionCount')
        query.addSelect((qb) => {
            return qb.select('COUNT(*)', 'jobPositionCount')
                .from(JobPositionEntity, 'jk')
                .where('jk.positionId = position.id');
        }, 'jobPositionCount')
        query.addSelect((qb) => {
            return qb.select('COUNT(*)', 'jobActivePositionCount')
                .from(JobPositionEntity, 'jk')
                .innerJoin('jk.job', 'jobV3', `jobV3.status = :prm_status and jobV3.endDate >= :prm_date`)
                .setParameter('prm_status', JobStatus.Publish)
                .setParameter('prm_date', moment().startOf('date').toDate())
                .where('jk.positionId = position.id');
        }, 'jobActivePositionCount')

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

    async createOrEdit(data: CreateOrEditTag) {
        if (data.id) {
            const tag = await this.positionRepository.findOne({
                where: {
                    id: data.id
                }
            })
            if (tag) {
                return await this.positionRepository.update({ id: tag.id }, {
                    name: data.name,
                    isApprove: data.isApprove
                })
            }
        } else {
            const exists = await this.positionRepository.findOne({
                where: {
                    name: data.name
                }
            })
            if (exists) {
                throw new ConflictException('Đã tồn tại');
            }
            return this.positionRepository.save({
                id: data.id,
                name: data.name,
                isApprove: data.isApprove
            })
        }
    }
}
