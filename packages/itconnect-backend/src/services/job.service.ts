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
import {
    fillAllDate,
    getFormatDateGroupBy,
    PageDto,
    PageMetaDto,
    PageOptionsDto, StatisticGroupBy,
    StatisticOption
} from "../dtos/page.dto";
import {SchoolEntity} from "../entities/school.entity";
import {CertificateEntity} from "../entities/certificate.entity";
import {SkillEntity} from "../entities/skill.entity";
import {PositionEntity} from "../entities/position.entity";
import * as moment from "moment";
import {DateUtils} from "typeorm/util/DateUtils";
import {JobTypeEntity} from "../entities/jobType.entity";
import {PointJobUserQueue} from "../queues/point-job-user.queue";
import {JobViewLogEntity} from "../entities/jobViewLog.entity";
import {JobApplyEntity} from "../entities/jobApply.entity";
import {JobSavedEntity} from "../entities/jobSaved.entity";
import {JobApplyStatisticOption} from "../dtos/jobApply.dto";
import {UserPositionEntity} from "../entities/userPosition.entity";

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
        private dataSource: DataSource,
        private pointWithJobQueue: PointJobUserQueue
    ) {

    }

    async getById(id: number, hasCheckIsOwner = false) {
        const user = this.request['user'] as UserEntity;
        const qr = this.jobRepository.createQueryBuilder('job');
        qr.where({ id });

        //
        qr.innerJoinAndSelect('job.user', 'user', `user.role <> :prm_role`, {
            prm_role: AppRole.ban
        });
        qr.leftJoinAndSelect('user.userInfo', 'userInfo');
        qr.leftJoinAndSelect('user.companyInfo', 'companyInfoU');

        qr.leftJoinAndSelect('job.addressProvince', 'addressProvince');
        qr.leftJoinAndSelect('job.addressDistrict', 'addressDistrict');
        qr.leftJoinAndSelect('job.addressVillage', 'addressVillage');
        qr.leftJoinAndSelect('job.jobPositions', 'jobPositions');
        qr.leftJoinAndSelect('jobPositions.position', 'position');
        qr.leftJoinAndSelect('job.jobSkills', 'jobSkills');
        qr.leftJoinAndSelect('jobSkills.skill', 'skill');
        qr.leftJoinAndSelect('job.jobCertificates', 'jobCertificates');
        qr.leftJoinAndSelect('jobCertificates.certificate', 'certificate');
        qr.leftJoinAndSelect('job.jobSchools', 'jobSchools');
        qr.leftJoinAndSelect('jobSchools.school', 'school');
        qr.leftJoinAndSelect('job.jobWorkFrom', 'jobWorkFrom');
        qr.leftJoinAndSelect('jobWorkFrom.workFrom', 'workFrom');
        qr.leftJoinAndSelect('job.jobJobLevels', 'jobJobLevels');
        qr.leftJoinAndSelect('jobJobLevels.jobLevel', 'jobLevel');
        qr.leftJoinAndSelect('job.jobType', 'jobType');
        qr.leftJoinAndSelect('job.companyTag', 'companyTag');
        qr.leftJoinAndSelect('companyTag.companyInfo', 'companyInfo');
        qr.leftJoinAndSelect('companyInfoU.banner', 'banner');
        qr.leftJoinAndSelect('companyInfoU.avatar', 'avatar');
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
        qr.loadRelationCountAndMap(
            'job.jobViewLogCount',
            'job.jobViewLogs',
            'jobViewLogCount'
        )
        const data = await qr.getOne();
        if (!data) {
            throw new BadRequestException()
        }

        if (!hasCheckIsOwner && user.role !== AppRole.admin) {
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

    async publish(jobId: number) {
        const jobEntity = await this.owner(jobId);
        if (!jobEntity) {
            throw new ForbiddenException();
        }

        if (jobEntity.status === JobStatus.Draft) {
            await this.jobRepository.update({ id: jobId }, {
                status: JobStatus.WaitApprove
            });
        } else {
            throw new BadRequestException(`status: ${jobEntity.status} is refuse`)
        }
    }

    async approve(jobId: number) {
        const jobEntity = await this.jobRepository.findOne({
            where: {
                id: jobId
            }
        });
        if (!jobEntity) {
            throw new ForbiddenException();
        }

        if (jobEntity.status === JobStatus.WaitApprove) {
            await this.jobRepository.update({ id: jobId }, {
                status: JobStatus.WaitSystem
            });
            await this.pointWithJobQueue.registerComputeJob(jobEntity.id);
        } else {
            throw new BadRequestException(`status: ${jobEntity.status} is refuse`)
        }
    }

    async ban(jobId: number) {
        const jobEntity =  await this.jobRepository.findOne({
            where: {
                id: jobId
            }
        });
        if (!jobEntity) {
            throw new ForbiddenException();
        }

        await this.jobRepository.update({ id: jobId }, {
            status: JobStatus.Ban
        });
    }

    async stop(jobId: number) {
        const jobEntity = await this.owner(jobId);
        if (!jobEntity) {
            throw new ForbiddenException();
        }

        if (jobEntity.status === JobStatus.Publish) {
            await this.jobRepository.update({ id: jobId }, {
                endDate: moment().subtract(1, 'days').startOf('date').toDate()
            });
        } else {
            throw new BadRequestException(`status: ${jobEntity.status} is refuse`)
        }
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

        dataEntity.pointPosition = data.pointPosition || null;
        dataEntity.pointSkill = data.pointSkill || null;
        dataEntity.pointSchool = data.pointSchool || null;
        dataEntity.pointCertificate = data.pointCertificate || null;
        dataEntity.pointLevelJob = data.pointLevelJob || null;
        dataEntity.pointWorkFrom = data.pointWorkFrom || null;
        dataEntity.pointLevelType = data.pointLevelType || null;
        dataEntity.pointYoe = data.pointYoe || null;

        dataEntity.size = data.size || null;

        try {
            if (draft) {
                dataEntity.status = JobStatus.Draft;
            } else {
                dataEntity.status = JobStatus.WaitApprove;
            }

            if (id) {
                // update
                // check owner
                const jobEntity = await this.owner(id);
                if (!jobEntity) {
                    throw new ForbiddenException();
                }

                if (jobEntity.status === JobStatus.Draft) {
                    await queryRunner.manager.update(JobEntity, { id }, dataEntity);
                } else {
                    throw new BadRequestException(`status: ${jobEntity.status} is refuse`)
                }

            } else {
                // create
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

        // not compute wait approve
        // if (!draft) {
        //     await this.pointWithJobQueue.registerComputeJob(id);
        // }

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
            const lvMin = `\`${fieldLv}\`.\`levelMin\``;
            const lvMax = `\`${fieldLv}\`.\`levelMax\``;
            return `(
                \`${field}\`.\`name\` like :prm_name_${field}_${index} and
                ${lvMin} <= :prm_max_${field}_${index} and
                :prm_min_${field}_${index} <= ${lvMax}
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

    async search(query: JobSearchQueryInputDto, body: JobSearchBodyInputDto, page: PageOptionsDto) {
        const user = this.request['user'] as UserEntity;
        const qr = this.jobRepository.createQueryBuilder('job');

        // check company post exists and not banned
        qr.innerJoinAndSelect('job.user', 'user', `user.role <> :prm_role`, {
            prm_role: AppRole.ban
        });

        // job level, map id
        if (body.jobLevel?.length) {
            qr.innerJoinAndSelect(
                'job.jobJobLevels',
                'jobJobLevels',
                'jobJobLevels.jobLevelId in (:prm_job_level)',
                {
                    prm_job_level: body.jobLevel
                }
            )
        }

        // work from, map id
        if (body.workFrom?.length) {
            qr.innerJoinAndSelect(
                'job.jobWorkFrom',
                'jobWorkFrom',
                'jobWorkFrom.workFromId in (:prm_work_from)',
                {
                    prm_work_from: body.workFrom
                }
            )
        }

        // school, map text
        if (body.school?.length) {
            const s = this.makeCondSearch('school', body.school);
            qr.innerJoinAndSelect('job.jobSchools',  'jobSchools');
            qr.innerJoinAndSelect('jobSchools.school', 'school', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('job.jobSchools',  'jobSchools');
            qr.leftJoinAndSelect('jobSchools.school', 'school');
        }

        // certificate, map text
        if (body.certificate?.length) {
            const s = this.makeCondSearchOverlap('certificate', 'jobCertificates', body.certificate);
            qr.innerJoinAndSelect('job.jobCertificates',  'jobCertificates');
            qr.innerJoinAndSelect('jobCertificates.certificate', 'certificate', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('job.jobCertificates',  'jobCertificates');
            qr.leftJoinAndSelect('jobCertificates.certificate', 'certificate');
        }

        // skill, map text
        if (body.skill?.length) {
            const s = this.makeCondSearchOverlap('skill', 'jobSkills', body.skill);
            qr.innerJoinAndSelect('job.jobSkills',  'jobSkills');
            qr.innerJoinAndSelect('jobSkills.skill', 'skill', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('job.jobSkills',  'jobSkills');
            qr.leftJoinAndSelect('jobSkills.skill', 'skill');
        }

        // position, map text
        if (body.position?.length) {
            const s = this.makeCondSearchOverlap('position', 'jobPositions', body.position);
            qr.innerJoinAndSelect('job.jobPositions',  'jobPositions');
            qr.innerJoinAndSelect('jobPositions.position', 'position', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('job.jobPositions',  'jobPositions');
            qr.leftJoinAndSelect('jobPositions.position', 'position');
        }

        // company, map text
        if (body.company?.length) {
            const s = this.makeCondSearch('companyTag', body.company);
            qr.innerJoinAndSelect('job.companyTag',  'companyTag', s.cond, s.params);
        } else {
            qr.leftJoinAndSelect('job.companyTag', 'companyTag');
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
            if (user.role !== AppRole.admin) {
                qr.andWhere({
                    user: Id(user.id)
                })
            }
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

        qr.leftJoinAndSelect('companyTag.companyInfo', 'companyInfo');
        qr.leftJoinAndSelect('companyInfo.avatar', 'avatar');
        qr.leftJoinAndSelect('companyInfo.banner', 'banner');
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
        qr.loadRelationCountAndMap(
            'job.jobViewLogCount',
            'job.jobViewLogs',
            'jobViewLogCount'
        )

        // fast fix mapping count
        // need update
        qr.addSelect((qb) => {
            return qb.select('COUNT(*)', 'jobViewLogCount')
                .from(JobViewLogEntity, 'jvl')
                .where('jvl.jobId = job.id');
        }, 'jobViewLogCount')

        qr.addSelect((qb) => {
            return qb.select('COUNT(*)', 'jobApplyCount')
                .from(JobApplyEntity, 'jvl')
                .where('jvl.jobId = job.id');
        }, 'jobApplyCount')

        qr.addSelect((qb) => {
            return qb.select('COUNT(*)', 'jobSavedCount')
                .from(JobSavedEntity, 'jvl')
                .where('jvl.jobId = job.id');
        }, 'jobSavedCount')

        // qr.select([
        //     'job',
        //     'companyTag.id',
        //     'companyTag.name',
        //     'addressProvince.id',
        //     'addressProvince.name',
        //     'addressDistrict.id',
        //     'addressDistrict.name',
        //     'addressVillage',
        // ])
        qr.skip(page.skip);
        qr.take(page.take);
        const result = await qr.getMany();

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: page });
        return new PageDto(result, meta)
    }

    async sts1(query: StatisticOption) {
        const qrView = this.jobRepository.createQueryBuilder('ja');
        qrView.select(`
            DATE_FORMAT(ja.updatedAt,:prm_group) legend,
            SUM(case when ja.status = :prm_jt_publish then 1 else 0 end) countJobPublish, 
            SUM(case when ja.status = :prm_jt_wait_approve then 1 else 0 end) countJobWaitApprove, 
            SUM(case when ja.status = :prm_jt_ban then 1 else 0 end) countJobBan, 
            SUM(case when ja.status = :prm_jt_draft then 1 else 0 end) countJobDraft 
        `);
        qrView.setParameter('prm_group', getFormatDateGroupBy(query.group));
        qrView.setParameter('prm_jt_publish', JobStatus.Publish);
        qrView.setParameter('prm_jt_wait_approve', JobStatus.WaitApprove);
        qrView.setParameter('prm_jt_ban', JobStatus.Ban);
        qrView.setParameter('prm_jt_draft', JobStatus.Draft);
        qrView.groupBy('legend')
        qrView.orderBy('ja.updatedAt', 'DESC')


        const qrFillDate = this.jobRepository.createQueryBuilder('ja')
        if (!query.start) {
            qrFillDate.select('min(ja.updatedAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                // subtract 1 unit because chart need more value
                let unit: moment.unitOfTime.DurationConstructor = 'day'
                switch (query.group) {
                    case StatisticGroupBy.Month:
                        unit = 'month'
                        break;
                    case StatisticGroupBy.Year:
                        unit = 'year';
                        break
                }
                query.start = moment(r.date).subtract(1, unit).toDate()
            }
        } else {
            qrView.andWhere({
                updatedAt: MoreThanOrEqual(moment(query.start).toDate())
            })
        }

        if (!query.end) {
            qrFillDate.select('max(ja.updatedAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                query.end = moment(r.date).toDate()
            }
        } else {
            qrView.andWhere({
                updatedAt: LessThanOrEqual(moment(query.end).toDate())
            })
        }

        const view = await qrView.getRawMany();

        return fillAllDate(view, query.start, query.end, query.group);
    }

    async sts2(query: StatisticOption) {
        const qrView = this.jobRepository.createQueryBuilder('ja');
        qrView.select(`
            DATE_FORMAT(ja.endDate,:prm_group) legend,
            SUM(case when ja.status = :prm_jt_publish and ja.endDate < :prm_end_date then 1 else 0 end) countJobEnd 
        `);
        qrView.setParameter('prm_group', getFormatDateGroupBy(query.group));
        qrView.setParameter('prm_end_date', moment().startOf('date').toDate());
        qrView.setParameter('prm_jt_publish', JobStatus.Publish);
        qrView.groupBy('legend')
        qrView.orderBy('ja.endDate', 'DESC')


        const qrFillDate = this.jobRepository.createQueryBuilder('ja')
        if (!query.start) {
            qrFillDate.select('min(ja.endDate) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                // subtract 1 unit because chart need more value
                let unit: moment.unitOfTime.DurationConstructor = 'day'
                switch (query.group) {
                    case StatisticGroupBy.Month:
                        unit = 'month'
                        break;
                    case StatisticGroupBy.Year:
                        unit = 'year';
                        break
                }
                query.start = moment(r.date).subtract(1, unit).toDate()
            }
        } else {
            qrView.andWhere({
                endDate: MoreThanOrEqual(moment(query.start).toDate())
            })
        }

        if (!query.end) {
            qrFillDate.select('max(ja.endDate) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                query.end = moment(r.date).toDate()
            }
        } else {
            qrView.andWhere({
                endDate: LessThanOrEqual(moment(query.end).toDate())
            })
        }

        const view = await qrView.getRawMany();

        return fillAllDate(view, query.start, query.end, query.group);
    }

    async sts3(query: StatisticOption) {
        const qrView = this.jobRepository.createQueryBuilder('ja');
        qrView.select(`
            DATE_FORMAT(ja.createdAt,:prm_group) legend,
            COUNT(*) countJob
        `);
        qrView.setParameter('prm_group', getFormatDateGroupBy(query.group));
        qrView.groupBy('legend')
        qrView.orderBy('ja.createdAt', 'DESC')


        const qrFillDate = this.jobRepository.createQueryBuilder('ja')
        if (!query.start) {
            qrFillDate.select('min(ja.createdAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                // subtract 1 unit because chart need more value
                let unit: moment.unitOfTime.DurationConstructor = 'day'
                switch (query.group) {
                    case StatisticGroupBy.Month:
                        unit = 'month'
                        break;
                    case StatisticGroupBy.Year:
                        unit = 'year';
                        break
                }
                query.start = moment(r.date).subtract(1, unit).toDate()
            }
        } else {
            qrView.andWhere({
                createdAt: MoreThanOrEqual(moment(query.start).toDate())
            })
        }

        if (!query.end) {
            qrFillDate.select('max(ja.createdAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                query.end = moment(r.date).toDate()
            }
        } else {
            qrView.andWhere({
                createdAt: LessThanOrEqual(moment(query.end).toDate())
            })
        }

        const view = await qrView.getRawMany();

        return fillAllDate(view, query.start, query.end, query.group);
    }

}
