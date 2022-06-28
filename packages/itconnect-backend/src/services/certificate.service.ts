import {ConflictException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, FindOptionsWhere, In, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CertificateEntity} from "../entities/certificate.entity";
import {CertificateCreateDto, CertificateDto, CertificateSearchInputDto} from "../dtos/certificate.dto";
import {REQUEST} from "@nestjs/core";
import {UserTaggedCertificateEntity} from "../entities/userTaggedCertificate.entity";
import {SkillEntity} from "../entities/skill.entity";
import {Approve} from "../dtos/abstract.dto";
import {UserEntity} from "../entities/user.entity";
import {hasUserTagged} from "../polices/permission.enum";

@Injectable({ scope: Scope.REQUEST })
export class CertificateService {

    constructor(
        @InjectRepository(CertificateEntity)
        private certificateRepository: Repository<CertificateEntity>,
        @InjectRepository(UserTaggedCertificateEntity)
        private userTaggedCertificate: Repository<UserTaggedCertificateEntity>,
        @Inject(REQUEST) private request: Request
    ) {
    }

    isOwner(certificateId: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.userTaggedCertificate.findOne({
            where: {
                user: { id: currentUser.id },
                certificate: { id: certificateId }
            }
        })
    }

    isApprove(certificateId: number) {
        return this.certificateRepository.findOne({
            where: {
                id: certificateId,
                isApprove: true
            }
        })
    }

    async search(dtoSearch: CertificateSearchInputDto, dtoPage: PageOptionsDto) {
        const query = this.certificateRepository.createQueryBuilder('certificate');
        query.select('certificate.*');

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
        if (hasUserTagged(currentUser) && !whereClause.isApprove) {
            const userTagged = await this.userTaggedCertificate.find({
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
                        id: In(userTagged.map(item => item.certificate))
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

    async create(data: CertificateCreateDto) {
        const name = data.name;
        let certificate = await this.certificateRepository.findOne({
            where: { name }
        })

        const currentUser = this.request['user'] as UserEntity;

        // create owner
        if (hasUserTagged(currentUser)) {
            if (!certificate) {
                certificate = await this.certificateRepository.save({ name });
            }
            const data = {
                user: {
                    id: currentUser.id
                },
                certificate: {
                    id: certificate.id
                }
            };
            const skillTagged = await this.userTaggedCertificate.findOne({
                where: data
            })
            if (skillTagged) {
                throw new ConflictException('Certificate is exists');
            }
            await this.userTaggedCertificate.save(data)
        } else {
            throw new ConflictException('Certificate is exists');
        }

        return certificate;
    }
}
