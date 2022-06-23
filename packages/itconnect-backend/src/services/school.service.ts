import {ConflictException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, FindOptionsWhere, In, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SkillDto} from "../dtos/skill.dto";
import {SchoolEntity} from "../entities/school.entity";
import {SchoolCreateDto, SchoolSearchInputDto} from "../dtos/school.dto";
import {UserTaggedSkillEntity} from "../entities/userTaggedSkill.entity";
import {REQUEST} from "@nestjs/core";
import {UserTaggedSchoolEntity} from "../entities/userTaggedSchool.entity";
import {SkillEntity} from "../entities/skill.entity";
import {Approve} from "../dtos/abstract.dto";
import {UserEntity} from "../entities/user.entity";
import {hasUserTagged} from "../polices/permission.enum";

@Injectable({ scope: Scope.REQUEST })
export class SchoolService {

    constructor(
        @InjectRepository(SchoolEntity)
        private schoolRepository: Repository<SchoolEntity>,
        @InjectRepository(UserTaggedSchoolEntity)
        private userTaggedSchoolRepository: Repository<UserTaggedSchoolEntity>,
        @Inject(REQUEST) private request: Request
    ) {
    }

    // without is global
    isOwner(schoolId: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.userTaggedSchoolRepository.findOne({
            where: {
                user: { id: currentUser.id },
                school: { id: schoolId }
            }
        })
    }

    isApprove(schoolId: number) {
        return this.schoolRepository.findOne({
            where: {
                id: schoolId,
                isApprove: true
            }
        })
    }

    async search(dtoSearch: SchoolSearchInputDto, dtoPage: PageOptionsDto) {
        const query = this.schoolRepository.createQueryBuilder('skill');
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
            const userTagged = await this.userTaggedSchoolRepository.find({
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
                        id: In(userTagged.map(item => item.school))
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

    async create(data: SchoolCreateDto) {
        const name = data.name;
        let school = await this.schoolRepository.findOne({
            where: { name }
        })

        const currentUser = this.request['user'] as UserEntity;

        // create owner
        if (hasUserTagged(currentUser)) {
            if (!school) {
                school = await this.schoolRepository.save({ name });
            }
            const data = {
                user: {
                    id: currentUser.id
                },
                school: {
                    id: school.id
                }
            };
            const skillTagged = await this.userTaggedSchoolRepository.findOne({
                where: data
            })
            if (skillTagged) {
                throw new ConflictException('Skill is exists');
            }
            await this.userTaggedSchoolRepository.save(data)
        } else {
            throw new ConflictException('Skill is exists');
        }

        return school;
    }
}
