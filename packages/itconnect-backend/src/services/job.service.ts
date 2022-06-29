import {BadRequestException, ForbiddenException, Inject, Injectable, Logger, Request, Scope} from '@nestjs/common';
import {JobCreateOrEditDto, JobSearchBodyInputDto, JobSearchQueryInputDto} from "../dtos/job.dto";
import {JobEntity, JobStatus} from "../entities/job.entity";
import {DataSource, DeepPartial, In, LessThanOrEqual, Like, MoreThanOrEqual, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {JobPositionEntity} from "../entities/jobPosition.entity";
import {JobSkillEntity} from "../entities/jobSkill.entity";
import {JobSchoolEntity} from "../entities/jobSchool.entity";
import {JobCertificateEntity} from "../entities/jobCertificate.entity";
import {JobWorkFromEntity} from "../entities/jobWorkFrom.entity";
import {JobJobLevelEntity} from "../entities/jobJobLevel.entity";
import {Id, queryExists, queryExistsMulti} from "../utils/function";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {AppRole} from "../polices/permission.enum";
import {CompanyInfoEntity} from "../entities/companyInfo.entity";
import {CompanyTagEntity} from "../entities/companyTag.entity";
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {SchoolEntity} from "../entities/school.entity";
import {CertificateEntity} from "../entities/certificate.entity";
import {SkillEntity} from "../entities/skill.entity";
import {PositionEntity} from "../entities/position.entity";
import * as moment from "moment";
import {DateUtils} from "typeorm/util/DateUtils";
import {JobTypeEntity} from "../entities/jobType.entity";

@Injectable({ scope: Scope.REQUEST })
export class JobService {

    constructor(
        @InjectRepository(JobEntity)
        private jobRepository: Repository<JobEntity>,
        @InjectRepository(JobPositionEntity)
        private jobPositionRepository: Repository<JobPositionEntity>,
        @InjectRepository(JobSkillEntity)
        private jobSkillRepository: Repository<JobSkillEntity>,
        @InjectRepository(JobSchoolEntity)
        private jobSchoolRepository: Repository<JobSchoolEntity>,
        @InjectRepository(JobCertificateEntity)
        private jobCertificateRepository: Repository<JobCertificateEntity>,
        @InjectRepository(JobWorkFromEntity)
        private jobWorkFromRepository: Repository<JobWorkFromEntity>,
        @InjectRepository(JobJobLevelEntity)
        private jobJobLevelRepository: Repository<JobJobLevelEntity>,
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
        @InjectRepository(JobTypeEntity)
        private jobTypeRepository: Repository<JobTypeEntity>,
        @Inject(REQUEST) private request: Request,
        private dataSource: DataSource
    ) {

    }

    async getById(id: number, hasCheckIsOwner = false) {
        const user = this.request['user'] as UserEntity;
        const qr = this.jobRepository.createQueryBuilder('job');
        qr.where({ id });
        qr.leftJoinAndSelect('job.addressProvince', 'addressProvince');
        qr.leftJoinAndSelect('job.addressDistrict', 'addressDistrict');
        qr.leftJoinAndSelect('job.addressVillage', 'addressVillage');
        qr.leftJoinAndSelect('job.jobPositions', 'jobPositions');
        qr.leftJoinAndSelect('jobPositions.position', 'jobPositions.position');
        qr.leftJoinAndSelect('job.jobSkills', 'jobSkills');
        qr.leftJoinAndSelect('jobSkills.skill', 'jobSkills.skill');
        qr.leftJoinAndSelect('job.jobCertificates', 'jobCertificates');
        qr.leftJoinAndSelect('jobCertificates.certificate', 'jobCertificates.certificate');
        qr.leftJoinAndSelect('job.jobSchools', 'jobSchools');
        qr.leftJoinAndSelect('jobSchools.school', 'jobSchools.school');
        qr.leftJoinAndSelect('job.jobWorkFrom', 'jobWorkFrom');
        qr.leftJoinAndSelect('jobWorkFrom.workFrom', 'jobWorkFrom.workFrom');
        qr.leftJoinAndSelect('job.jobJobLevels', 'jobJobLevels');
        qr.leftJoinAndSelect('jobJobLevels.jobLevel', 'jobJobLevels.jobLevel');
        qr.leftJoinAndSelect('job.jobType', 'jobType');
        qr.leftJoinAndSelect('job.companyTag', 'companyTag');
        qr.leftJoinAndSelect('companyTag.companyInfo', 'companyTag.companyInfo');
        qr.leftJoinAndSelect('job.user', 'user');
        qr.leftJoinAndSelect('user.userInfo', 'user.userInfo');
        qr.leftJoinAndSelect('user.companyInfo', 'user.companyInfo');
        qr.loadRelationCountAndMap('job.jobApplyCount', 'job.jobApply', 'jobApplyCount');
        qr.loadRelationCountAndMap(
            'job.jobApplySelf',
            'job.jobApply',
            'jobApplySelf',
            (qr) => qr.where({
                user: Id(user.id)
            })
        )
        qr.loadRelationCountAndMap(
            'job.jobSavedSelf',
            'job.jobSaved',
            'jobSavedSelf',
            (qr) => qr.where({
                user: Id(user.id)
            })
        )
        const data = await qr.getOne();
        if (!hasCheckIsOwner) {
               if (
                   data.status !== JobStatus.Publish &&
                   data.user.id !== user.id
               ) {
                   throw new ForbiddenException();
               }
        }
        return this.formatData(data);
    }

    async delete(id: number) {
        const data = await this.owner(id);
        if (!data) {
            throw new ForbiddenException();
        }
        return this.jobRepository.softRemove(data);
    }

    async createOrEdit(data: JobCreateOrEditDto, hasResponseEntity: boolean, draft: boolean) {
        // decrease cpu, not validate owner tagged skill, position, certificate, school
        const user = this.request['user'] as UserEntity;
        let id = data.id;
        let dataEntity: DeepPartial<JobEntity>;

        //  use transaction
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        // data address, company tag id
        if (user.role === AppRole.company) {
            // map data company to job
            const companyInfo = await queryRunner.manager.findOne(CompanyInfoEntity, {
                where: {
                    user: Id(user.id)
                },
                loadRelationIds: true
            });
            // const companyTag = await queryRunner.manager.findOne(CompanyTagEntity, {
            //     where: {
            //         companyInfo: Id(companyInfo.id)
            //     },
            // })
            dataEntity = {
                addressProvince: Id(companyInfo.addressProvince as unknown as number),
                addressDistrict: Id(companyInfo.addressDistrict as unknown as number),
                addressVillage: Id(companyInfo.addressVillage as unknown as number),
                addressStreet: companyInfo.addressStreet,
                companyTag: Id(companyInfo.companyTag as unknown as number)
            }
        } else {
            // valid address & companyTag is required
            // if (!(data.addressProvince && data.addressDistrict &&
            //     data.addressVillage && data.addressStreet && data.companyTag)) {
            //     throw new BadRequestException();
            // }
            // dataEntity = {
            //     addressProvince: Id(data.addressProvince),
            //     addressDistrict: Id(data.addressDistrict),
            //     addressVillage: Id(data.addressVillage),
            //     addressStreet: data.addressStreet,
            //     companyTag: Id(data.companyTag)
            // }
            // not support logic
            throw new ForbiddenException('Chưa support logic')
        }

        // basic data
        dataEntity.name = data.name;
        dataEntity.salaryMin = data.salaryMin || null;
        dataEntity.salaryMax = data.salaryMax || null;
        dataEntity.descriptionContent = data.descriptionContent;
        dataEntity.requirementContent = data.requirementContent;
        dataEntity.reasonContent = data.reasonContent || null;
        dataEntity.yoe = data.yoe || null;
        dataEntity.endDate = data.endDate;
        dataEntity.jobType = data.jobType ? Id(data.jobType) : null;

        try {
            if (id) {
                // update
                // check owner
                const jobEntity = await this.owner(id);
                if (!jobEntity) {
                    throw new ForbiddenException();
                }

                // only update when status is Draft or WaitSystem or WaitApprove
                if (
                    jobEntity.status === JobStatus.Draft ||
                    jobEntity.status === JobStatus.WaitSystem ||
                    jobEntity.status === JobStatus.WaitApprove
                ) {
                    await queryRunner.manager.update(JobEntity, { id }, dataEntity);
                } else {
                    throw new BadRequestException(`status: ${jobEntity.status} is refuse`)
                }

            } else {
                // create
                if (draft) {
                    dataEntity.status = JobStatus.Draft;
                } else {
                    // not wait approve because, it not module approve on role moder
                    // updated: If it has role moder change to WaitApprove
                    dataEntity.status = JobStatus.Publish; // WaitSystem
                }
                dataEntity.user = Id(user.id);
                const result = await queryRunner.manager.save(JobEntity, dataEntity);
                id = result.id;
            }

            // update jobPosition
            const configJobForeign = [
                {
                    target: JobPositionEntity,
                    foreignKey: 'position',
                    data: data.jobPositions
                },
                {
                    target: JobSkillEntity,
                    foreignKey: 'skill',
                    data: data.jobSkills
                },
                {
                    target: JobSchoolEntity,
                    foreignKey: 'school',
                    data: data.jobSchools
                },
                {
                    target: JobCertificateEntity,
                    foreignKey: 'certificate',
                    data: data.jobCertificates
                },
                {
                    target: JobWorkFromEntity,
                    foreignKey: 'workFrom',
                    data: data.jobWorkFrom
                },
                {
                    target: JobJobLevelEntity,
                    foreignKey: 'jobLevel',
                    data: data.jobJobLevels
                }
            ];
            for (let config of configJobForeign) {
                let jobForeign = config.data as any;
                if (!jobForeign) {
                    continue;
                }

                // add job id
                jobForeign = jobForeign.map(({name, ...item}) => {
                   return {...item, job: Id(id) };
                });

                // remove all
                await queryRunner.manager.delete(config.target, {
                    job: Id(id)
                })
                // re insert
                await queryRunner.manager.save(
                    config.target,
                    jobForeign
                );
            }

            // commit
            await queryRunner.commitTransaction();
        } catch (e) {
            const logger = new Logger();
            logger.error(e)
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }

        if (hasResponseEntity) {
            return this.getById(id, true);
        }
        return { status: true }
    }

    private owner(jobId: number) {
        const user = this.request['user'] as UserEntity;
        return this.jobRepository.findOne({
            where: {
                id: jobId,
                user: Id(user.id)
            }
        });
    }

    private formatData(job: JobEntity) {
        if (job.user) {
            delete job.user.password;
        }
        return job;
    }

    async search(query: JobSearchQueryInputDto, body: JobSearchBodyInputDto, page: PageOptionsDto) {
        const user = this.request['user'] as UserEntity;
        const qr = this.jobRepository.createQueryBuilder('job');

        // job level, map id
        if (body.jobLevel?.length) {
            const qrJobJobLevel = this.jobJobLevelRepository.createQueryBuilder('jobJobLevel');
            qrJobJobLevel.select('jobJobLevel.id')
            qrJobJobLevel.where('jobJobLevel.jobId = job.id');
            qrJobJobLevel.andWhere({
                jobLevel: In(body.jobLevel)
            });
            /**
             * build query
             * where exists jobJobLevel.jobLevelId in (....)
             *
             */
            queryExists(qr, qrJobJobLevel);
        }

        // work from, map id
        if (body.workFrom?.length) {
            const qrJobWorkFrom = this.jobWorkFromRepository.createQueryBuilder('jobWorkFrom');
            qrJobWorkFrom.select('jobWorkFrom.id')
            qrJobWorkFrom.where('jobWorkFrom.jobId = job.id');
            qrJobWorkFrom.andWhere({
                workFrom: In(body.workFrom)
            });
            /**
             * build query
             * where exists jobWorkFrom.jobId in (.....)
             *
             */
            queryExists(qr, qrJobWorkFrom);
        }

        // school, map text
        if (body.school?.length) {
            const keyword = body.school.map(search => ({
                name: Like(`%${search}%`)
            }));
            const qrSchool = this.schoolRepository.createQueryBuilder('school');
            qrSchool.select('school.id');
            qrSchool.where('jobSchool.schoolId = school.id');
            qrSchool.andWhere(keyword);

            const qrJobSchool =  this.jobSchoolRepository.createQueryBuilder('jobSchool');
            qrJobSchool.select('jobSchool.id');
            qrJobSchool.where('jobSchool.jobId = job.id')
            queryExists(qrJobSchool, qrSchool);

            /**
             * build query
             * where exists jobSchool (exists school.name like(... or .... or ...))
             *
             */
            queryExists(qr, qrJobSchool);
        }

        // certificate, map text
        if (body.certificate?.length) {
            const groupQuery = body.certificate.map(g => {
                const keyword = {
                    name: Like(`%${g.name}%`)
                };
                const qrCertificate = this.certificateRepository.createQueryBuilder('certificate');
                qrCertificate.select('certificate.id');
                qrCertificate.where('jobCertificate.certificateId = certificate.id');
                qrCertificate.andWhere(keyword);

                const qrJobCertificate =  this.jobCertificateRepository.createQueryBuilder('jobCertificate');
                qrJobCertificate.select('jobCertificate.id');
                qrJobCertificate.where('jobCertificate.jobId = job.id')
                if (g.levelMin) {
                    qrJobCertificate.andWhere({
                        levelMin: LessThanOrEqual(g.levelMin)
                    })
                }
                if (g.levelMax) {
                    qrJobCertificate.andWhere({
                        levelMax: MoreThanOrEqual(g.levelMax)
                    })
                }

                queryExists(qrJobCertificate, qrCertificate);
                return qrJobCertificate;
            })

            /**
             * build query
             * where (
             *  exists jobCertificate (levelMin, levelMax) and (exists certificate.name like ...)
             *  or
             *  exists jobCertificate (levelMin, levelMax) and (exists certificate.name like ...)
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
                qrSkill.where('jobSkill.skillId = skill.id');
                qrSkill.andWhere(keyword);

                const qrJobSkill =  this.jobSkillRepository.createQueryBuilder('jobSkill');
                qrJobSkill.select('jobSkill.id');
                qrJobSkill.where('jobSkill.jobId = job.id')
                if (g.levelMin) {
                    qrJobSkill.andWhere({
                        levelMin: LessThanOrEqual(g.levelMin)
                    })
                }
                if (g.levelMax) {
                    qrJobSkill.andWhere({
                        levelMax: MoreThanOrEqual(g.levelMax)
                    })
                }

                queryExists(qrJobSkill, qrSkill);
                return qrJobSkill;
            })

            /**
             * build query
             * where (
             *  exists jobSkill (levelMin, levelMax) and (exists skill.name like ...)
             *  or
             *  exists jobSkill (levelMin, levelMax) and (exists skill.name like ...)
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
                qrPosition.where('jobPosition.positionId = position.id');
                qrPosition.andWhere(keyword);

                const qrJobPosition =  this.jobPositionRepository.createQueryBuilder('jobPosition');
                qrJobPosition.select('jobPosition.id');
                qrJobPosition.where('jobPosition.jobId = job.id')
                if (g.levelMin) {
                    qrJobPosition.andWhere({
                        levelMin: LessThanOrEqual(g.levelMin)
                    })
                }
                if (g.levelMax) {
                    qrJobPosition.andWhere({
                        levelMax: MoreThanOrEqual(g.levelMax)
                    })
                }

                queryExists(qrJobPosition, qrPosition);
                return qrJobPosition;
            })

            /**
             * build query
             * where (
             *  exists jobPosition (levelMin, levelMax) and (exists position.name like ...)
             *  or
             *  exists jobPosition (levelMin, levelMax) and (exists position.name like ...)
             *  ...)
             *
             */
            queryExistsMulti(qr, groupQuery, 'or');
        }

        // company
        if (body.company?.length) {
            const keyword = body.company.map(search => ({
                name: Like(`%${search}%`)
            }));
            const queryCompanyTag = this.companyTagRepository.createQueryBuilder('companyTag');
            queryCompanyTag.where('companyTag.id = job.companyTagId')
            queryCompanyTag.andWhere(keyword)
            queryExists(qr, queryCompanyTag);
        }

        // job type
        if (body.jobType?.length) {
            qr.andWhere({
                jobType: {
                    id: In(body.jobType)
                }
            })
        }

        // yoe
        if (body.yoe) {
            qr.andWhere({
                yoe: MoreThanOrEqual(body.yoe)
            })
        }

        // salary min
        if (body.salaryMin) {
            qr.andWhere({
                status: body.salaryMin
            })
        }
        if (body.salaryMax) {
            qr.andWhere({
                status: body.salaryMax
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

        // status
        if (body.status) {
            qr.andWhere({
                status: body.status
            })
        }

        // expired
        if (!body.includeJobExpired) {
            qr.andWhere({
                endDate: MoreThanOrEqual(DateUtils.mixedDateToUtcDatetimeString(
                    moment().startOf('date').toDate()
                ))
            })
        }

        /**
         * Valid owner when
         *  + status filter different Publish
         *  +
         *  +
         *
         */
        if (
            !body.status ||
            body.status !== JobStatus.Publish ||
            body.includeJobExpired
        ) {
            const user = this.request['user'] as UserEntity;
            qr.andWhere({
                user: Id(user.id)
            })
        }

        // page
        if (query.search) {
            qr.andWhere({
                name: Like(`%${query.search}%`)
            })
        }

        if (page.order_field && page.order) {
            qr.orderBy(page.order_field, page.order)
        }

        const total = await qr.getCount();

        qr.leftJoinAndSelect('job.companyTag', 'companyTag');
        qr.leftJoinAndSelect('job.addressProvince', 'addressProvince');
        qr.leftJoinAndSelect('job.addressDistrict', 'addressDistrict');
        qr.leftJoinAndSelect('job.addressVillage', 'addressVillage');
        qr.loadRelationCountAndMap('job.jobApplyCount', 'job.jobApply', 'jobApplyCount')
        qr.loadRelationCountAndMap(
            'job.jobApplySelf',
            'job.jobApply',
            'jobApplySelf',
            (qr) => qr.where({
               user: Id(user.id)
            })
        )
        qr.loadRelationCountAndMap(
            'job.jobSavedSelf',
            'job.jobSaved',
            'jobSavedSelf',
            (qr) => qr.where({
                user: Id(user.id)
            })
        )
        qr.select([
            'job.id',
            'job.name',
            'job.addressStreet',
            'job.updatedAt',
            'companyTag.id',
            'companyTag.name',
            'addressProvince.id',
            'addressProvince.name',
            'addressDistrict.id',
            'addressDistrict.name',
            'addressVillage',
        ])
        qr.skip(page.skip);
        qr.take(page.take);
        const result = await qr.getMany();

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: page });
        return new PageDto(result, meta)
    }
}
