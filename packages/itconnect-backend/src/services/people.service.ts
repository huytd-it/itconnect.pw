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
import {JobSearchBodyInputDto, JobSearchQueryInputDto} from "../dtos/job.dto";
import {DateUtils} from "typeorm/util/DateUtils";
import * as moment from "moment";
import {JobStatus} from "../entities/job.entity";
import {AppRole} from "../polices/permission.enum";

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

    private makeCondSearch(field: string, data: string[]) {
        const cond = data.map((item, index) => {
            return `(\`${field}\`.\`name\` like :prm_${field}_${index})`
        }).join(' or ');
        const params = data.reduce((val, item, index) => {
            val[`prm_${field}_${index}`] = `%${item}%`;
            return val;
        }, {});
        return { cond, params };
    }

    private makeCondSearchOverlap(field: string, fieldLv: string, data: { name: string, levelMin: number, levelMax: number }[]) {
        // overlap test https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-if-two-ranges-overlap
        const cond = data.map((item, index) => {
            const lv = `\`${fieldLv}\`.\`level\``;
            return `(
                \`${field}\`.\`name\` like :prm_name_${field}_${index} and
                ${lv} <= :prm_max_${field}_${index} and
                :prm_min_${field}_${index} <= ${lv}
            )`
        }).join(' or ');
        const params = data.reduce((val, item, index) => {
            val[`prm_name_${field}_${index}`] = `%${item.name}%`;
            val[`prm_min_${field}_${index}`] = item.levelMin;
            val[`prm_max_${field}_${index}`] = item.levelMax;
            return val;
        }, {});
        return { cond, params };
    }

    async search(query: PeopleSearchQueryInputDto, body: PeopleSearchBodyInputDto, page: PageOptionsDto) {
        const user = this.request['user'] as UserEntity;
        const qr = this.userRepository.createQueryBuilder('user');
        qr.innerJoinAndSelect('user.userInfo', 'userInfo')
        qr.andWhere({
            role: Not(AppRole.ban)
        })

        // user job level, map id
        if (body.jobLevel?.length) {
            qr.andWhere({
                userInfo: {
                    jobLevel: {
                        id: In(body.jobLevel)
                    }
                }
            })
        }

        // school, map text
        if (body.school?.length) {
            const s = this.makeCondSearch('school', body.school);
            qr.innerJoinAndSelect('user.cvEducations',  'cvEducations');
            qr.innerJoinAndSelect('cvEducations.school', 'school', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('user.cvEducations',  'cvEducations');
            qr.leftJoinAndSelect('cvEducations.school', 'school');
        }

        // certificate, map text
        if (body.certificate?.length) {
            const s = this.makeCondSearchOverlap('certificate', 'userCertificates', body.certificate);
            qr.innerJoinAndSelect('user.userCertificates',  'userCertificates');
            qr.innerJoinAndSelect('userCertificates.certificate', 'certificate', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('user.userCertificates',  'userCertificates');
            qr.leftJoinAndSelect('userCertificates.certificate', 'certificate');
        }

        // skill, map text
        if (body.skill?.length) {
            const s = this.makeCondSearchOverlap('skill', 'userSkills', body.skill);
            qr.innerJoinAndSelect('user.userSkills',  'userSkills');
            qr.innerJoinAndSelect('userSkills.skill', 'skill', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('user.userSkills',  'userSkills');
            qr.leftJoinAndSelect('userSkills.skill', 'skill');
        }

        // position, map text
        if (body.position?.length) {
            const s = this.makeCondSearchOverlap('position', 'userPositions', body.position);
            qr.innerJoinAndSelect('user.userPositions',  'userPositions');
            qr.innerJoinAndSelect('userPositions.position', 'position', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('user.userPositions',  'userPositions');
            qr.leftJoinAndSelect('userPositions.position', 'position');
        }

        // company
        if (body.company?.length) {
            const s = this.makeCondSearch('companyTag', body.company);
            qr.innerJoinAndSelect('user.cvWorkExperiences',  'cvWorkExperiences');
            qr.innerJoinAndSelect('cvWorkExperiences.companyTag', 'companyTag', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('user.cvWorkExperiences',  'cvWorkExperiences');
            qr.leftJoinAndSelect('cvWorkExperiences.companyTag', 'companyTag');
        }

        // yoe
        if (body.yoe) {
            // not support current
            // need update
            qr.andWhere({
                userInfo: {
                    computeYoe: MoreThanOrEqual(body.yoe)
                }
            })
        }

        // address
        if (body.addressDistrict) {
            qr.andWhere({
                userInfo: {
                    addressDistrict: body.addressDistrict
                }
            })
        }
        if (body.addressProvince) {
            qr.andWhere({
                userInfo: {
                    addressProvince: body.addressProvince
                }
            })
        }
        if (body.addressVillage) {
            qr.andWhere({
                userInfo: {
                    addressProvince: body.addressVillage
                }
            })
        }

        // exclude user
        if (!body.includeSelf) {
            qr.andWhere({
                id: Not(user.id)
            })
        }

        // page
        if (query.search) {
            qr.andWhere({
                userInfo: {
                    fullName: Like(`%${query.search}%`)
                }
            })
        }

        if (page.order_field && page.order) {
            qr.orderBy(page.order_field, page.order)
        }

        const total = await qr.getCount();

        qr.leftJoinAndSelect('userInfo.addressProvince', 'addressProvince');
        qr.leftJoinAndSelect('userInfo.addressDistrict', 'addressDistrict');
        qr.leftJoinAndSelect('userInfo.addressVillage', 'addressVillage');
        qr.leftJoinAndSelect('userInfo.avatar', 'avatar');
        qr.leftJoinAndSelect('userInfo.banner', 'banner');
        qr.leftJoinAndSelect(
            'user.cvWorkExperienceCurrents',
            'cvWorkExperienceCurrents',
            'cvWorkExperienceCurrents.endDate is null'
        )
        qr.leftJoinAndSelect('cvWorkExperienceCurrents.companyTag', 'companyTagUV')

        qr.skip(page.skip);
        qr.take(page.take);
        const result = await qr.getMany();

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: page });
        return new PageDto(result, meta)
    }

}
