import {Injectable, Logger} from '@nestjs/common';
import {PointConfigKV, PointConfigService} from "./point-config.service";
import {DataSource, DeepPartial, In, LessThanOrEqual, MoreThanOrEqual, QueryRunner} from "typeorm";
import {POINT_MAX_USER_PER_TICK} from "../entities/pointConfig.entity";
import {PointJobUserEntity} from "../entities/pointJobUser.entity";
import {UserEntity} from "../entities/user.entity";
import {AppRole} from "../polices/permission.enum";
import {JobEntity, JobStatus} from "../entities/job.entity";
import {Id} from "../utils/function";
import * as moment from "moment";
import {InjectQueue} from "@nestjs/bull";
import {QueuePointWithJob, QueuePointWithUser} from "../queues/queue.enum";
import {Queue} from "bull";
import {PointWithJobProcess} from "../queues/point-with-job.processor";

@Injectable()
export class PointJobUserService {
    private pointConfig: PointConfigKV;

    constructor(
        private dataSource: DataSource,
        private pointConfigService: PointConfigService,
    ) {
    }

    async computeWithUser(userId: number) {
        this.pointConfig = await this.pointConfigService.getConfig();
        const logger = new Logger();
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let totalJob = 0;
        try {
            let user = await this.getUser(queryRunner, userId);
            // console.log(util.inspect(user, false, null, true /* enable colors */))
            let currentIndex = 0;
            let jobTake = POINT_MAX_USER_PER_TICK;
            totalJob = await this.countJobCanMapping(queryRunner, user);

            // compute per page
            while (currentIndex < totalJob) {
                let jobs = await this.getJobCanMapping(queryRunner, user, currentIndex, jobTake);
                let pointInserts: DeepPartial<PointJobUserEntity>[] = [];

                for (let job of jobs) {
                    // console.log(util.inspect(job, false, null, true /* enable colors */))
                    const point = this.computePointJob(job, user);
                    // logger.log(`user:${user.id} - job:${job.id} - ${point.pointTotal} point`);
                    pointInserts.push(point);
                }

                // insert
                await this.upsertPoint(queryRunner, pointInserts);

                // next page
                currentIndex += jobTake;
            }
            await queryRunner.commitTransaction();
        } catch (e) {
            console.log(e);
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }

        return totalJob;
    }

    async computeWithJob(jobId: number) {
        this.pointConfig = await this.pointConfigService.getConfig();
        const logger = new Logger();
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let totalUser = 0;
        try {
            let job = await this.getJob(queryRunner, jobId);
            let currentIndex = 0;
            let userTake = POINT_MAX_USER_PER_TICK;
            totalUser = await this.countUserCanMapping(queryRunner, job);

            // compute per page
            while (currentIndex < totalUser) {
                let users = await this.getUserCanMapping(queryRunner, job, currentIndex, userTake);
                let pointInserts: DeepPartial<PointJobUserEntity>[] = [];

                for (let user of users) {
                    // console.log(util.inspect(user, false, null, true /* enable colors */))
                    const point = this.computePointUser(job, user);
                    // logger.log(`user:${user.id} - job:${job.id} - ${point.pointTotal} point`);
                    pointInserts.push(point);
                }

                // insert
                await this.upsertPoint(queryRunner, pointInserts);

                // next page
                currentIndex += userTake;
            }
            await queryRunner.commitTransaction();
        } catch (e) {
            console.log(e);
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }

        return totalUser;
    }

    private defaultField() {
        return [
            'pointSkill',
            'pointPosition',
            'pointCertificate',
            'pointSchool',
            'pointWorkFrom',
            'pointLevelJob',
            'pointYoe',
            'pointLevelType',
            'pointTotal'
        ] as (keyof PointJobUserEntity)[]
    }

    private upsertPoint(
        queryRunner: QueryRunner,
        points: DeepPartial<PointJobUserEntity>[],
        fieldUpdate: (keyof PointJobUserEntity)[] = this.defaultField()
    ) {
        const qr = queryRunner.manager.createQueryBuilder()
            .insert()
            .into(PointJobUserEntity)
            .values(points);

        if (fieldUpdate?.length) {
            qr.orUpdate(fieldUpdate)
        }

        return qr.execute();
    }

    private async countUserCanMapping(queryRunner: QueryRunner, job: JobEntity) {
        return (await this.createQueryUserCanMapping(queryRunner, job))
            .getCount();
    }

    private async countJobCanMapping(queryRunner: QueryRunner, user: UserEntity) {
        return (await this.createQueryJobCanMapping(queryRunner, user))
            .getCount();
    }

    private async getUserCanMapping(queryRunner: QueryRunner, job: JobEntity, currentIndex: number, userTake: number) {
        return (await this.createQueryUserCanMapping(queryRunner, job))
            .take(userTake)
            .skip(currentIndex)
            .getMany();
    }

    private async getJobCanMapping(queryRunner: QueryRunner, user: UserEntity, currentIndex: number, userTake: number) {
        return (await this.createQueryJobCanMapping(queryRunner, user))
            .take(userTake)
            .skip(currentIndex)
            .getMany();
    }

    private async createQueryUserCanMapping(queryRunner: QueryRunner, job: JobEntity) {
        const qr = queryRunner.manager.createQueryBuilder(UserEntity, 'user');
        qr.where({
            role: AppRole.user
        });

        /**
         * InnerJoin user <-> userTag <-> tag with isApprove and levelRange
         * Ex: user <->  userSkill <-> skill
         *              [fieldUser]   [fieldTag]
         *
         * @param fieldUser
         * @param fieldTag
         */
        const makeCondLevelRange = (
            fieldUser: string,
            fieldTag: string,
            data: { levelMin: number, levelMax: number, [k: string]: number }[]
        ) => {
            // join check level min & max
            if (data?.length) {
                const cond = data.map((item, index) => {
                    return this.condLevelRange(fieldUser, fieldTag, index);
                })
                const params = data.reduce((val, item, index) => {
                    const param = this.paramLevelRange(
                        fieldUser,
                        item[fieldTag],
                        item.levelMin,
                        item.levelMax,
                        index
                    );
                    return Object.assign(val, param);
                }, {})
                qr.leftJoinAndSelect(`user.${fieldUser}`, fieldUser, `(${cond.join(' or ')})`, params);
            } else {
                qr.leftJoinAndSelect(`user.${fieldUser}`, fieldUser);
            }

            // join to tag check is approve
            qr.leftJoinAndSelect(
                `${fieldUser}.${fieldTag}`,
                fieldTag,
                this.condApprove(fieldTag),
                this.paramApprove(fieldTag)
            );
        }

        makeCondLevelRange('userSkills', 'skill', job.jobSkills as any);
        makeCondLevelRange('userPositions', 'position', job.jobPositions as any);
        makeCondLevelRange('userCertificates', 'certificate', job.jobCertificates as any);

        // on 'cvEducations'
        qr.leftJoinAndSelect('user.cvEducations', 'cvEducations');
        qr.leftJoinAndSelect('cvEducations.school', 'school', this.condApprove('school'), this.paramApprove('school'));

        // on 'userInfo'
        qr.leftJoinAndSelect('user.userInfo', 'userInfo');

        // check work from
        // on 'cvWorkExperience'
        qr.leftJoinAndSelect('user.cvWorkExperiences',  'cvWorkExperiences');
        qr.leftJoinAndSelect(
            'cvWorkExperiences.jobLevel',
            'jobLevel',
            'jobLevel.id in (:prm_job_level)',
            {
                'prm_job_level': job.jobJobLevels.map(item => item.jobLevel).join(',')
            }
        )
        qr.leftJoinAndSelect(
            'cvWorkExperiences.workFrom',
            'workFrom',
            'workFrom.id in (:prm_work_from)',
            {
                'prm_work_from': job.jobWorkFrom.map(item => item.workFrom).join(',')
            }
        )
        qr.leftJoinAndSelect(
            'cvWorkExperiences.jobType',
            'jobType',
            'jobType.id = :prm_job_type',
            {
                'prm_job_type': job.jobType
            }
        )

        // exists one
        qr.andWhere(`(
            userSkills.id is not null or
            userPositions.id is not null or
            userCertificates.id is not null or
            cvEducations.school.id is not null or
            cvWorkExperiences.workFrom.id is not null or
            cvWorkExperiences.jobLevel.id is not null or
            cvWorkExperiences.jobType.id is not null
        )`)

        return qr;
    }

    private async createQueryJobCanMapping(queryRunner: QueryRunner, user: UserEntity) {
        const qr = queryRunner.manager.createQueryBuilder(JobEntity, 'job');
        qr.where({
            status: In([JobStatus.Publish, JobStatus.WaitSystem]),
            endDate: MoreThanOrEqual(new Date())
        });

        /**
         * InnerJoin user <-> userTag <-> tag with level
         * Ex: user <->  userSkill <-> skill
         *              [fieldUser]   [fieldTag]
         *
         * @param fieldJob
         * @param fieldTag
         */
        const makeCondLevelRange = (
            fieldJob: string,
            fieldTag: string,
            data: { level: number, [k: string]: number }[]
        ) => {
            // join check level min & max
            if (data?.length) {
                const cond = data.map((item, index) => {
                    return this.condLevel(fieldJob, fieldTag, index);
                })
                const params = data.reduce((val, item, index) => {
                    const param = this.paramLevel(
                        fieldJob,
                        item[fieldTag],
                        item.level,
                        index
                    );
                    return Object.assign(val, param);
                }, {})
                qr.leftJoinAndSelect(`job.${fieldJob}`, fieldJob, `(${cond.join(' or ')})`, params);
            } else {
                // not join data
                qr.leftJoinAndSelect(`job.${fieldJob}`, fieldJob, '(1=2)');
            }
        }


        /**
         * InnerJoin user <-> userTag <-> tag with exists
         * Ex: user <->  userSkill <-> skill
         *              [fieldUser]   [fieldTag]
         *
         * @param fieldJob
         * @param fieldTag
         */
        const makeCondExists = (
            fieldJob: string,
            fieldTag: string,
            data: number[]
        ) => {
            // join check exists
            if (data?.length) {
                const cond = data.map((item, index) => {
                    return this.condExists(fieldJob, fieldTag, index);
                })
                const params = data.reduce((val, item, index) => {
                    const param = this.paramExists(
                        fieldJob,
                        item,
                        index
                    );
                    return Object.assign(val, param);
                }, {})
                qr.leftJoinAndSelect(`job.${fieldJob}`, fieldJob, `(${cond.join(' or ')})`, params);
            } else {
                // not join data
                qr.leftJoinAndSelect(`job.${fieldJob}`, fieldJob, '(1=2)');
            }
        }


        makeCondLevelRange('jobSkills', 'skill', user.userSkills as any);
        makeCondLevelRange('jobPositions', 'position', user.userPositions as any);
        makeCondLevelRange('jobCertificates', 'certificate', user.userCertificates as any);
        makeCondExists(
            'jobSchools',
            'school',
            this.uniqueAndNotNull(user.cvEducations.map(item => item.school) as any)
        );
        makeCondExists(
            'jobWorkFrom',
            'workFrom',
            this.uniqueAndNotNull(user.cvWorkExperiences.map(item => item.workFrom) as any)
        );
        makeCondExists(
            'jobJobLevels',
            'jobLevel',
            this.uniqueAndNotNull(user.cvWorkExperiences.map(item => item.jobLevel) as any)
        );

        // job type
        qr.leftJoinAndSelect('job.jobType', 'jobType');

        // exists one
        qr.andWhere(`(
            jobSkills.id is not null or
            jobPositions.id is not null or
            jobCertificates.id is not null or
            jobSchools.id is not null or
            jobWorkFrom.id is not null or
            jobJobLevels.id is not null or
            job.jobType.id is not null
        )`)

        return qr;
    }

    private getJob(queryRunner: QueryRunner, jobId: number) {
        const job = queryRunner.manager.createQueryBuilder(JobEntity, 'job');
        job.where({ id: jobId });
        job.leftJoinAndSelect('job.jobSkills', 'jobSkills');
        job.leftJoinAndSelect('job.jobPositions', 'jobPositions');
        job.leftJoinAndSelect('job.jobCertificates', 'jobCertificates');
        job.leftJoinAndSelect('job.jobSchools', 'jobSchools');
        job.leftJoinAndSelect('job.jobWorkFrom', 'jobWorkFrom');
        job.leftJoinAndSelect('job.jobJobLevels', 'jobJobLevels');
        job.loadRelationIdAndMap('jobSkills.skill', 'jobSkills.skill')
        job.loadRelationIdAndMap('jobPositions.position', 'jobPositions.position')
        job.loadRelationIdAndMap('jobCertificates.certificate', 'jobCertificates.certificate')
        job.loadRelationIdAndMap('jobSchools.school', 'jobSchools.school')
        job.loadRelationIdAndMap('jobWorkFrom.workFrom', 'jobWorkFrom.workFrom')
        job.loadRelationIdAndMap('jobJobLevels.jobLevel', 'jobJobLevels.jobLevel')
        job.loadRelationIdAndMap('job.jobType', 'job.jobType')
        return job.getOne();
    }

    private async getUser(queryRunner: QueryRunner, userId: number) {
        const user = queryRunner.manager.createQueryBuilder(UserEntity, 'user');
        user.where({ id: userId });
        user.leftJoinAndSelect('user.userSkills', 'userSkills');
        user.leftJoin(
            'userSkills.skill',
            'skill',
            this.condApprove('skill'),
            this.paramApprove('skill')
        );
        user.leftJoinAndSelect('user.userPositions', 'userPositions');
        user.leftJoin(
            'userPositions.position',
            'position',
            this.condApprove('position'),
            this.paramApprove('position')
        );
        user.leftJoinAndSelect('user.userCertificates', 'userCertificates');
        user.leftJoin(
            'userCertificates.certificate',
            'certificate',
            this.condApprove('certificate'),
            this.paramApprove('certificate')
        );
        user.leftJoinAndSelect('user.cvEducations', 'cvEducations');
        user.leftJoin(
            'cvEducations.school',
            'school',
            this.condApprove('school'),
            this.paramApprove('school')
        );
        user.leftJoinAndSelect('user.cvWorkExperiences', 'cvWorkExperiences');
        user.loadRelationIdAndMap('cvWorkExperiences.workFrom', 'cvWorkExperiences.workFrom');
        user.loadRelationIdAndMap('cvWorkExperiences.jobLevel', 'cvWorkExperiences.jobLevel');
        user.loadRelationIdAndMap('cvWorkExperiences.jobType', 'cvWorkExperiences.jobType');
        user.loadRelationIdAndMap('userSkills.skill', 'userSkills.skill')
        user.loadRelationIdAndMap('userPositions.position', 'userPositions.position')
        user.loadRelationIdAndMap('userCertificates.certificate', 'userCertificates.certificate')
        user.loadRelationIdAndMap('cvEducations.school', 'cvEducations.school');

        return user.getOne();
    }

    private condExists(userTag: string, tag: string, index: number = 0) {
        return `(
            \`${userTag}\`.\`${tag}Id\` = :lv_tag_${userTag}${index}
        )`;
    }

    private paramExists(name: string, tagId: number, index: number = 0) {
        return {
            ['lv_tag_' + name + index]: tagId,
        };
    }

    private condLevel(jobTag: string, tag: string, index: number = 0) {
        return `(
            \`${jobTag}\`.\`levelMin\` <= :lv_${jobTag}${index} and 
            \`${jobTag}\`.\`levelMax\` >= :lv_${jobTag}${index} and
            \`${jobTag}\`.\`${tag}Id\` = :lv_tag_${jobTag}${index}
        )`;
    }

    private paramLevel(name: string, tagId: number, level: number, index: number = 0) {
        return {
            ['lv_' + name + index]: level,
            ['lv_tag_' + name + index]: tagId,
        };
    }

    private condLevelRange(userTag: string, tag: string, index: number = 0) {
        return `(
            \`${userTag}\`.\`level\` >= :lv_min_${userTag}${index} and 
            \`${userTag}\`.\`level\` <= :lv_max_${userTag}${index} and
            \`${userTag}\`.\`${tag}Id\` = :lv_tag_${userTag}${index}
        )`;
    }

    private paramLevelRange(name: string, tagId: number, levelMin: number, levelMax: number, index: number = 0) {
        return {
            ['lv_min_' + name + index]: levelMin,
            ['lv_max_' + name + index]: levelMax,
            ['lv_tag_' + name + index]: tagId,
        };
    }

    private condApprove(name: string) {
        return `(\`${name}\`.\`isApprove\` = :prm_approve_${name})`;
    }

    private paramApprove(name: string) {
        return {
            ['prm_approve_' + name.toLowerCase()]: true
        };
    }

    private uniqueAndNotNull(ids: number[]) {
        const hashing: {[key: number]: boolean} = {};
        return ids.reduce<number[]>((val, item) => {
            if (
                typeof item != "undefined" && item !== null && !hashing[item]
            ) {
                val.push(item);
                hashing[item] = true;
            }
            return val;
        }, [])
    }

    private computePointUserPosition(job: JobEntity, user: UserEntity) {
        return user.userPositions?.reduce((val, item) => {
            val += this.pointConfig.position;
            return val;
        }, 0);
    }

    private computePointJobPosition(job: JobEntity, user: UserEntity) {
        return job.jobPositions?.reduce((val, item) => {
            val += this.pointConfig.position;
            return val;
        }, 0);
    }

    private computePointUserSkill(job: JobEntity, user: UserEntity) {
        return user.userSkills?.reduce((val, item) => {
            val += this.pointConfig.skill;
            return val;
        }, 0);
    }

    private computePointJobSkill(job: JobEntity, user: UserEntity) {
        return job.jobSkills?.reduce((val, item) => {
            val += this.pointConfig.skill;
            return val;
        }, 0);
    }

    private computePointUserCertificate(job: JobEntity, user: UserEntity) {
        return user.userCertificates?.reduce((val, item) => {
            val += this.pointConfig.certificate;
            return val;
        }, 0);
    }

    private computePointJobCertificate(job: JobEntity, user: UserEntity) {
        return job.jobCertificates?.reduce((val, item) => {
            val += this.pointConfig.certificate;
            return val;
        }, 0);
    }

    private computePointUserSchool(job: JobEntity, user: UserEntity) {
        return user.cvEducations?.reduce((val, item) => {
            if (item.school?.id) {
                val += this.pointConfig.school;
            }
            return val;
        }, 0);
    }

    private computePointJobSchool(job: JobEntity, user: UserEntity) {
        return job.jobSchools?.reduce((val, item) => {
            val += this.pointConfig.school;
            return val;
        }, 0);
    }

    private computePointUserWorkFrom(job: JobEntity, user: UserEntity) {
        return user.cvWorkExperiences?.reduce((val, item) => {
            if (item.workFrom) {
                val += this.pointConfig.workFrom;
            }
            return val;
        }, 0);
    }

    private computePointJobWorkFrom(job: JobEntity, user: UserEntity) {
        return job.jobWorkFrom?.reduce((val, item) => {
            val += this.pointConfig.workFrom;
            return val;
        }, 0);
    }

    private computePointUserJobLevel(job: JobEntity, user: UserEntity) {
        return user.cvWorkExperiences?.reduce((val, item) => {
            if (item.jobLevel) {
                val += this.pointConfig.jobLevel;
            }
            return val;
        }, 0);
    }

    private computePointJobJobLevel(job: JobEntity, user: UserEntity) {
        return job.jobJobLevels?.reduce((val, item) => {
            val += this.pointConfig.jobLevel;
            return val;
        }, 0);
    }

    private computePointUserYoe(job: JobEntity, user: UserEntity) {
        if (user.userInfo && job.yoe) {
            let info = user.userInfo;
            let month = info.computeYoe;
            if (info.computeYoeCurrent) {
                month += moment().diff(moment(info.computeYoeDate), 'month');
            }
            if (month/12 >= job.yoe) {
                return this.pointConfig.yoe;
            }
        }
        return 0;
    }

    private computePointUserJobType(job: JobEntity, user: UserEntity) {
        return user.cvWorkExperiences?.reduce((val, item) => {
            if (item.jobType) {
                val += this.pointConfig.jobType;
            }
            return val;
        }, 0);
    }

    private computePointJobJobType(job: JobEntity, user: UserEntity) {
        if (job.jobType) {
            return this.pointConfig.jobType;
        }
        return 0;
    }

    private computePointUser(job: JobEntity, user: UserEntity) {
        const point: DeepPartial<PointJobUserEntity> = {
            user: Id(user.id),
            job: Id(job.id)
        };

        point.pointPosition = this.computePointUserPosition(job, user);
        point.pointSkill = this.computePointUserSkill(job, user);
        point.pointCertificate = this.computePointUserCertificate(job, user);
        point.pointSchool = this.computePointUserSchool(job, user);
        point.pointWorkFrom = this.computePointUserWorkFrom(job, user);
        point.pointLevelJob = this.computePointUserJobLevel(job, user);
        point.pointLevelType = this.computePointUserJobType(job, user);
        point.pointYoe = this.computePointUserYoe(job, user);

        // total
        point.pointTotal = point.pointPosition + point.pointSkill + point.pointCertificate +
            point.pointSchool + point.pointWorkFrom + point.pointLevelJob +
            point.pointLevelType + point.pointYoe;

        return point;
    }

    private computePointJob(job: JobEntity, user: UserEntity) {
        const point: DeepPartial<PointJobUserEntity> = {
            user: Id(user.id),
            job: Id(job.id)
        };

        point.pointPosition = this.computePointJobPosition(job, user);
        point.pointSkill = this.computePointJobSkill(job, user);
        point.pointCertificate = this.computePointJobCertificate(job, user);
        point.pointSchool = this.computePointJobSchool(job, user);
        point.pointWorkFrom = this.computePointJobWorkFrom(job, user);
        point.pointLevelJob = this.computePointJobJobLevel(job, user);
        point.pointLevelType = this.computePointJobJobType(job, user);
        point.pointYoe = this.computePointUserYoe(job, user);

        // total
        point.pointTotal = point.pointPosition + point.pointSkill + point.pointCertificate +
            point.pointSchool + point.pointWorkFrom + point.pointLevelJob +
            point.pointLevelType + point.pointYoe;

        return point;
    }
}
