import {ConflictException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, FindOptionsWhere, In, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyTagEntity} from "../entities/companyTag.entity";
import {CompanyTagCreateDto, CompanyTagSearchInputDto} from "../dtos/company-tag.dto";
import {REQUEST} from "@nestjs/core";
import {UserTaggedCompanyTagEntity} from "../entities/userTaggedCompanyTag.entity";
import {Approve} from "../dtos/abstract.dto";
import {UserEntity} from "../entities/user.entity";
import {hasUserTagged} from "../polices/permission.enum";

@Injectable({ scope: Scope.REQUEST })
export class CompanyTagService {

    constructor(
        @InjectRepository(CompanyTagEntity)
        private companyTagRepository: Repository<CompanyTagEntity>,
        @InjectRepository(UserTaggedCompanyTagEntity)
        private userTaggedCompanyTagRepository: Repository<UserTaggedCompanyTagEntity>,
        @Inject(REQUEST) private request: Request
    ) {
    }

    // without is global
    isOwner(companyTagId: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.userTaggedCompanyTagRepository.findOne({
            where: {
                user: { id: currentUser.id },
                companyTag: { id: companyTagId }
            }
        })
    }

    isApprove(companyTagId: number) {
        return this.companyTagRepository.findOne({
            where: {
                id: companyTagId,
                isApprove: true
            }
        })
    }
    async search(dtoSearch: CompanyTagSearchInputDto, dtoPage: PageOptionsDto) {
        const query = this.companyTagRepository.createQueryBuilder('companyTag');
        query.select('companyTag.*');

        const whereClause: FindOptionsWhere<CompanyTagEntity> = {};
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
            const userTagged = await this.userTaggedCompanyTagRepository.find({
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
                        id: In(userTagged.map(item => item.companyTag))
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

    async create(data: CompanyTagCreateDto) {
        const name = data.name;
        let companyTag = await this.companyTagRepository.findOne({
            where: { name }
        })

        const currentUser = this.request['user'] as UserEntity;

        // create owner
        if (hasUserTagged(currentUser)) {
            if (!companyTag) {
                companyTag = await this.companyTagRepository.save({ name });
            }
            const data = {
                user: {
                    id: currentUser.id
                },
                companyTag: {
                    id: companyTag.id
                }
            };
            const companyTagTagged = await this.userTaggedCompanyTagRepository.findOne({
                where: data
            })
            if (companyTagTagged) {
                throw new ConflictException('Company Tag is exists');
            }
            await this.userTaggedCompanyTagRepository.save(data)
        } else {
            throw new ConflictException('Company Tag is exists');
        }

        return companyTag;
    }
}
