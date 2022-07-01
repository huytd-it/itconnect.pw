import {BadRequestException, ForbiddenException, Inject, Injectable, Logger, Request, Scope} from '@nestjs/common';
import {DataSource, DeepPartial, In, LessThanOrEqual, Like, MoreThanOrEqual, Not, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UserPositionEntity} from "../entities/userPosition.entity";
import {UserSkillEntity} from "../entities/userSkill.entity";
import {UserSchoolEntity} from "../entities/userSchool.entity";
import {UserCertificateEntity} from "../entities/userCertificate.entity";
import {Id, queryExists, queryExistsMulti} from "../utils/function";
import {REQUEST} from "@nestjs/core";
import {CompanyTagEntity} from "../entities/companyTag.entity";
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {SchoolEntity} from "../entities/school.entity";
import {CertificateEntity} from "../entities/certificate.entity";
import {SkillEntity} from "../entities/skill.entity";
import {PositionEntity} from "../entities/position.entity";
import {UserEntity} from "../entities/user.entity";
import {UserInfoEntity} from "../entities/userInfo.entity";
import {PeopleSearchBodyInputDto, PeopleSearchQueryInputDto} from "../dtos/people.dto";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {CvEducationService} from "./cv-education.service";
import {CvEducationEntity} from "../entities/cvEducation.entity";

@Injectable({ scope: Scope.REQUEST })
export class PeopleService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(UserInfoEntity)
        private userInfo: Repository<UserInfoEntity>,
        @InjectRepository(UserPositionEntity)
        private userPositionRepository: Repository<UserPositionEntity>,
        @InjectRepository(UserSkillEntity)
        private userSkillRepository: Repository<UserSkillEntity>,
        @InjectRepository(UserSchoolEntity)
        private userSchoolRepository: Repository<UserSchoolEntity>,
        @InjectRepository(UserCertificateEntity)
        private userCertificateRepository: Repository<UserCertificateEntity>,
        @InjectRepository(SchoolEntity)
        private schoolRepository: Repository<SchoolEntity>,
        @InjectRepository(CertificateEntity)
        private certificateRepository: Repository<CertificateEntity>,
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>,
        @InjectRepository(PositionEntity)
        private positionRepository: Repository<PositionEntity>,
        @InjectRepository(CompanyTagEntity)
        private companyTagRepository: Repository<CompanyTagEntity>,
        @InjectRepository(CvWorkExperienceEntity)
        private cvExperienceRepository: Repository<CvWorkExperienceEntity>,
        @InjectRepository(CvEducationEntity)
        private cvEducationRepository: Repository<CvEducationEntity>,
        @Inject(REQUEST) private request: Request,
        private dataSource: DataSource
    ) {

    }

    async search(query: PeopleSearchQueryInputDto, body: PeopleSearchBodyInputDto, page: PageOptionsDto) {
        const user = this.request['user'] as UserEntity;
        const qr = this.userInfo.createQueryBuilder('userInfo');
        qr.leftJoinAndSelect('userInfo.user', 'user')

        // user job level, map id
        if (body.jobLevel?.length) {
            qr.andWhere({
                jobLevel: {
                    id: In(body.jobLevel)
                }
            })
        }

        // school, map text
        if (body.school?.length) {
            const keyword = body.school.map(search => ({
                name: Like(`%${search}%`)
            }));
            const qrSchool = this.schoolRepository.createQueryBuilder('school');
            qrSchool.select('school.id');
            qrSchool.where('cvEducation.schoolId = school.id');
            qrSchool.andWhere(keyword);

            const qrCvEducation =  this.cvEducationRepository.createQueryBuilder('cvEducation');
            qrCvEducation.select('cvEducation.id');
            qrCvEducation.where('cvEducation.userId = user.id')
            queryExists(qrCvEducation, qrSchool);

            /**
             * build query
             * where exists userSchool (exists school.name like(... or .... or ...))
             *
             */
            queryExists(qr, qrCvEducation);
        }

        // certificate, map text
        if (body.certificate?.length) {
            const groupQuery = body.certificate.map(g => {
                const keyword = {
                    name: Like(`%${g.name}%`)
                };
                const qrCertificate = this.certificateRepository.createQueryBuilder('certificate');
                qrCertificate.select('certificate.id');
                qrCertificate.where('userCertificate.certificateId = certificate.id');
                qrCertificate.andWhere(keyword);

                const qrUserCertificate =  this.userCertificateRepository.createQueryBuilder('userCertificate');
                qrUserCertificate.select('userCertificate.id');
                qrUserCertificate.where('userCertificate.userId = user.id')
                if (g.levelMin) {
                    qrUserCertificate.andWhere({
                        levelMin: LessThanOrEqual(g.levelMin)
                    })
                }
                if (g.levelMax) {
                    qrUserCertificate.andWhere({
                        levelMax: MoreThanOrEqual(g.levelMax)
                    })
                }

                queryExists(qrUserCertificate, qrCertificate);
                return qrUserCertificate;
            })

            /**
             * build query
             * where (
             *  exists userCertificate (levelMin, levelMax) and (exists certificate.name like ...)
             *  or
             *  exists userCertificate (levelMin, levelMax) and (exists certificate.name like ...)
             *  ...)
             *
             */
            queryExistsMulti(qr, groupQuery, 'or');
        }

        // skill, map text
        if (body.skill?.length) {
            const groupQuery = body.skill.map(g => {
                const keyword = {
                    name: Like(`%${g.name}%`)
                };
                const qrSkill = this.skillRepository.createQueryBuilder('skill');
                qrSkill.select('skill.id');
                qrSkill.where('userSkill.skillId = skill.id');
                qrSkill.andWhere(keyword);

                const qrUserSkill =  this.userSkillRepository.createQueryBuilder('userSkill');
                qrUserSkill.select('userSkill.id');
                qrUserSkill.where('userSkill.userId = user.id')
                if (g.levelMin) {
                    qrUserSkill.andWhere({
                        levelMin: LessThanOrEqual(g.levelMin)
                    })
                }
                if (g.levelMax) {
                    qrUserSkill.andWhere({
                        levelMax: MoreThanOrEqual(g.levelMax)
                    })
                }

                queryExists(qrUserSkill, qrSkill);
                return qrUserSkill;
            })

            /**
             * build query
             * where (
             *  exists userSkill (levelMin, levelMax) and (exists skill.name like ...)
             *  or
             *  exists userSkill (levelMin, levelMax) and (exists skill.name like ...)
             *  ...)
             *
             */
            queryExistsMulti(qr, groupQuery, 'or');
        }

        // position, map text
        if (body.position?.length) {
            const groupQuery = body.position.map(g => {
                const keyword = {
                    name: Like(`%${g.name}%`)
                };
                const qrPosition = this.positionRepository.createQueryBuilder('position');
                qrPosition.select('position.id');
                qrPosition.where('userPosition.positionId = position.id');
                qrPosition.andWhere(keyword);

                const qrUserPosition =  this.userPositionRepository.createQueryBuilder('userPosition');
                qrUserPosition.select('userPosition.id');
                qrUserPosition.where('userPosition.userId = user.id')
                if (g.levelMin) {
                    qrUserPosition.andWhere({
                        levelMin: LessThanOrEqual(g.levelMin)
                    })
                }
                if (g.levelMax) {
                    qrUserPosition.andWhere({
                        levelMax: MoreThanOrEqual(g.levelMax)
                    })
                }

                queryExists(qrUserPosition, qrPosition);
                return qrUserPosition;
            })

            /**
             * build query
             * where (
             *  exists userPosition (levelMin, levelMax) and (exists position.name like ...)
             *  or
             *  exists userPosition (levelMin, levelMax) and (exists position.name like ...)
             *  ...)
             *
             */
            queryExistsMulti(qr, groupQuery, 'or');
        }

        // company
        if (body.company?.length) {
            const groupQuery = body.company.map(name => {
                const keyword = {
                    name: Like(`%${name}%`)
                };
                const qrCompanyTag = this.companyTagRepository.createQueryBuilder('companyTag');
                qrCompanyTag.select('companyTag.id');
                qrCompanyTag.where('cvExperience.companyTagId = companyTag.id');
                qrCompanyTag.andWhere(keyword);

                const qrCvExperience =  this.cvExperienceRepository.createQueryBuilder('cvExperience');
                qrCvExperience.select('cvExperience.id');
                qrCvExperience.where('cvExperience.userId = user.id')
                queryExists(qrCvExperience, qrCompanyTag);
                return qrCvExperience;
            })

            queryExistsMulti(qr, groupQuery, 'or');
        }

        // yoe
        if (body.yoe) {
            // not support current
            // need update
            qr.andWhere({
                computeYoe: MoreThanOrEqual(body.yoe)
            })
        }

        // address
        if (body.addressDistrict) {
            qr.andWhere({
                addressDistrict: body.addressDistrict
            })
        }
        if (body.addressProvince) {
            qr.andWhere({
                addressProvince: body.addressProvince
            })
        }
        if (body.addressVillage) {
            qr.andWhere({
                addressProvince: body.addressVillage
            })
        }

        // exclude user
        if (!body.includeSelf) {
            qr.andWhere({
                user: {
                    id: Not(user.id)
                }
            })
        }

        // page
        if (query.search) {
            qr.andWhere({
                fullName: Like(`%${query.search}%`)
            })
        }

        if (page.order_field && page.order) {
            qr.orderBy(page.order_field, page.order)
        }

        const total = await qr.getCount();

        qr.leftJoinAndSelect('userInfo.addressProvince', 'addressProvince');
        qr.leftJoinAndSelect('userInfo.addressDistrict', 'addressDistrict');
        qr.leftJoinAndSelect('userInfo.addressVillage', 'addressVillage');
        qr.leftJoinAndSelect(
            'user.cvWorkExperiences',
            'cvWorkExperiences',
            'cvWorkExperiences.endDate is null'
        )
        qr.leftJoinAndSelect('cvWorkExperiences.companyTag', 'companyTagCV');

        qr.skip(page.skip);
        qr.take(page.take);
        const result = await qr.getMany();

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: page });
        return new PageDto(result, meta)
    }
}
