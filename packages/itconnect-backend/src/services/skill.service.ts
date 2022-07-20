import {ConflictException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {CreateOrEditTag, PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindOptionsWhere, In, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SkillEntity} from "../entities/skill.entity";
import {SkillCreateDto, SkillSearchInputDto} from "../dtos/skill.dto";
import {Approve, DeleteParamsDto} from "../dtos/abstract.dto";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {hasUserTagged} from "../polices/permission.enum";
import {UserTaggedSkillEntity} from "../entities/userTaggedSkill.entity";
import {JobViewLogEntity} from "../entities/jobViewLog.entity";
import {JobSkillEntity} from "../entities/jobSkill.entity";
import {UserSkillEntity} from "../entities/userSkill.entity";
import {JobPositionEntity} from "../entities/jobPosition.entity";
import {JobStatus} from "../entities/job.entity";
import * as moment from "moment";
import {PointConfigService} from "./point-config.service";

@Injectable({ scope: Scope.REQUEST })
export class SkillService {

    constructor(
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>,
        @InjectRepository(UserTaggedSkillEntity)
        private userTaggedSkillRepository: Repository<UserTaggedSkillEntity>,
        @Inject(REQUEST) private request: Request,
        private pointConfigService: PointConfigService
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

        const config = await this.pointConfigService.getConfig();
        const allowAll = config.allow_tagged.point > 0;

        // owner tag
        const currentUser = this.request['user'] as UserEntity;
        if (hasUserTagged(currentUser) && !whereClause.isApprove && !allowAll) {
            const userTagged = await this.userTaggedSkillRepository.find({
                where: {
                    user: {
                        id: currentUser.id
                    }
                },
                loadRelationIds: true
            });
            if (userTagged.length) {
                // query.andWhere((clause) => {
                //     clause.where({
                //         id: In(userTagged.map(item => item.skill))
                //     })
                //     clause.orWhere({
                //         isApprove: true
                //     })
                // })
                query.andWhere(`
                    (skill.id in (:prm_ids) or
                    (skill.id not in (:prm_ids) and skill.isApprove = 1))
                `, {
                    prm_ids: userTagged.map(item => item.skill)
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
            'skill.jobSkillCount',
            'skill.jobSkills',
            'jobSkillCount'
        )
        query.loadRelationCountAndMap(
            'skill.userSkillCount',
            'skill.userSkills',
            'userSkillCount'
        )
        query.loadRelationCountAndMap(
            'skill.jobActiveSkillCount',
            'skill.jobActiveSkills',
            'jobActiveSkillCount'
        )

        // fast fix mapping count
        // need update
        query.addSelect((qb) => {
            return qb.select('COUNT(*)', 'userSkillCount')
                .from(UserSkillEntity, 'jk')
                .where('jk.skillId = skill.id');
        }, 'userSkillCount')
        query.addSelect((qb) => {
            return qb.select('COUNT(*)', 'jobSkillCount')
                .from(JobSkillEntity, 'jk')
                .where('jk.skillId = skill.id');
        }, 'jobSkillCount')
        query.addSelect((qb) => {
            return qb.select('COUNT(*)', 'jobActiveSkillCount')
                .from(JobSkillEntity, 'jk')
                .innerJoin('jk.job', 'jobV3', `jobV3.status = :prm_status and jobV3.endDate >= :prm_date`)
                .setParameter('prm_status', JobStatus.Publish)
                .setParameter('prm_date', moment().startOf('date').toDate())
                .where('jk.skillId = skill.id');
        }, 'jobActiveSkillCount')

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

    async createOrEdit(data: CreateOrEditTag) {
        if (data.id) {
            const tag = await this.skillRepository.findOne({
                where: {
                    id: data.id
                }
            })
            if (tag) {
                return await this.skillRepository.update({ id: tag.id }, {
                    name: data.name,
                    isApprove: data.isApprove
                })
            }
        } else {
            const exists = await this.skillRepository.findOne({
                where: {
                    name: data.name
                }
            })
            if (exists) {
                throw new ConflictException('Đã tồn tại');
            }
            return this.skillRepository.save({
                id: data.id,
                name: data.name,
                isApprove: data.isApprove
            })
        }
    }
}
