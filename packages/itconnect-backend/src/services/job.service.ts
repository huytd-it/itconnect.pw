import {BadRequestException, ForbiddenException, Inject, Injectable, Logger, Request, Scope} from '@nestjs/common';
import {JobCreateOrEditDto, JobSearchBodyInputDto, JobSearchQueryInputDto} from "../dtos/job.dto";
import {JobEntity, JobStatus} from "../entities/job.entity";
import {DataSource, DeepPartial, In, LessThanOrEqual, Like, MoreThanOrEqual, Not, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {JobPositionEntity} from "../entities/jobPosition.entity";
import {JobSkillEntity} from "../entities/jobSkill.entity";
import {JobSchoolEntity} from "../entities/jobSchool.entity";
import {JobCertificateEntity} from "../entities/jobCertificate.entity";
import {JobWorkFromEntity} from "../entities/jobWorkFrom.entity";
import {JobJobLevelEntity} from "../entities/jobJobLevel.entity";
import {Id, queryExists} from "../utils/function";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {AppRole} from "../polices/permission.enum";
import {CompanyInfoEntity} from "../entities/companyInfo.entity";
import {CompanyTagEntity} from "../entities/companyTag.entity";
import {JobLevelEntity} from "../entities/jobLevel.entity";
import {PageOptionsDto} from "../dtos/page.dto";
import {SchoolEntity} from "../entities/school.entity";

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
        @Inject(REQUEST) private request: Request,
        private dataSource: DataSource
    ) {

    }

    async getById(id: number, hasCheckIsOwner = false) {
        const user = this.request['user'] as UserEntity;
        const data = await this.jobRepository.findOne({
            where: {
                id
            },
            relations: [
                'addressProvince',
                'addressDistrict',
                'addressVillage',
                'jobPositions',
                'jobPositions.position',
                'jobSkills',
                'jobSkills.skill',
                'jobCertificates',
                'jobCertificates.certificate',
                'jobSchools',
                'jobSchools.school',
                'jobWorkFrom',
                'jobWorkFrom.workFrom',
                'jobJobLevels',
                'jobJobLevels.jobLevel',
                'companyTag',
                'companyTag.companyInfo',
                'user',
                'user.userInfo',
                'user.companyInfo'
            ]
        })
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
            const companyTag = await queryRunner.manager.findOne(CompanyTagEntity, {
                where: {
                    companyInfo: Id(companyInfo.id)
                },
            })
            dataEntity = {
                addressProvince: Id(companyInfo.addressProvince as unknown as number),
                addressDistrict: Id(companyInfo.addressDistrict as unknown as number),
                addressVillage: Id(companyInfo.addressVillage as unknown as number),
                addressStreet: companyInfo.addressStreet,
                companyTag: Id(companyTag.id)
            }
        } else {
            // valid address & companyTag is required
            if (!(data.addressProvince && data.addressDistrict &&
                data.addressVillage && data.addressStreet && data.companyTag)) {
                throw new BadRequestException();
            }
            dataEntity = {
                addressProvince: Id(data.addressProvince),
                addressDistrict: Id(data.addressDistrict),
                addressVillage: Id(data.addressVillage),
                addressStreet: data.addressStreet,
                companyTag: Id(data.companyTag)
            }
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
                    dataEntity.status = JobStatus.WaitSystem;
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

    search(query: JobSearchQueryInputDto, body: JobSearchBodyInputDto, page: PageOptionsDto) {
        const qr = this.jobRepository.createQueryBuilder('job');

        // job level, map id
        if (body.jobLevel?.length) {
            const qrJobJobLevel = this.jobJobLevelRepository.createQueryBuilder('jobJobLevel');
            qrJobJobLevel.select('jobJobLevel.id')
            qrJobJobLevel.where('jobJobLevel.jobId = job.id');
            qrJobJobLevel.andWhere({
                // or where
                jobLevel: In(body.jobLevel)
            });
            // qr.andWhere(`exists (${qrJobJobLevel.getQuery()})`, qrJobJobLevel.getParameters());
            queryExists(qr, qrJobJobLevel);
        }

        // work from, map id
        if (body.workFrom?.length) {
            const qrJobWorkFrom = this.jobWorkFromRepository.createQueryBuilder('jobWorkFrom');
            qrJobWorkFrom.select('jobWorkFrom.id')
            qrJobWorkFrom.where('jobWorkFrom.jobId = job.id');
            qrJobWorkFrom.andWhere({
                // or where
                workFrom: In(body.workFrom)
            });
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
            queryExists(qr, qrJobSchool);
        }

        // yoe
        if (body.yoe) {
            qr.andWhere({
                yoe: MoreThanOrEqual(body.yoe)
            })
        }

        console.log(qr.getQuery(), qr.getParameters());

        return qr.getMany();
    }
}
