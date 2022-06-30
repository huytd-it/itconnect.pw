import {Injectable, Logger} from '@nestjs/common';
import {PointConfigKV, PointConfigService} from "./point-config.service";
import {DataSource, DeepPartial, In, QueryRunner} from "typeorm";
import {POINT_MAX_USER_PER_TICK} from "../entities/pointConfig.entity";
import {PointJobUserEntity} from "../entities/pointJobUser.entity";
import {UserEntity} from "../entities/user.entity";
import {AppRole} from "../polices/permission.enum";
import * as util from "util";
import {JobEntity} from "../entities/job.entity";
import {Id} from "../utils/function";
import * as moment from "moment";

@Injectable()
export class PointJobUserService {
    private pointConfig: PointConfigKV;

    constructor(
        private dataSource: DataSource,
        private pointConfigService: PointConfigService
    ) {
    }

    async computeWithJob(jobId: number) {
        this.pointConfig = await this.pointConfigService.getConfig();
        const logger = new Logger();
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let job = await this.getJob(queryRunner, jobId);
            let totalUser = await this.countUserCanMapping(queryRunner, job);
            let currentIndex = 0;
            let userTake = POINT_MAX_USER_PER_TICK;

            // compute per page
            while (currentIndex < totalUser) {
                let users = await this.getUserCanMapping(queryRunner, job, currentIndex, userTake);
                let pointInserts: DeepPartial<PointJobUserEntity>[] = [];

                for (let user of users) {
                    // console.log(util.inspect(user, false, null, true /* enable colors */))
                    const point: DeepPartial<PointJobUserEntity> = {
                        user: Id(user.id),
                        job: Id(job.id)
                    };

                    point.pointPosition = this.computePointPosition(job, user);
                    point.pointSkill = this.computePointSkill(job, user);
                    point.pointCertificate = this.computePointCertificate(job, user);
                    point.pointSchool = this.computePointSchool(job, user);
                    point.pointWorkFrom = this.computePointWorkFrom(job, user);
                    point.pointLevelJob = this.computePointJobLevel(job, user);
                    point.pointLevelType = this.computePointJobType(job, user);
                    point.pointYoe = this.computePointYoe(job, user);

                    // total
                    point.pointTotal = point.pointPosition + point.pointSkill + point.pointCertificate +
                        point.pointSchool + point.pointWorkFrom + point.pointLevelJob +
                        point.pointLevelType + point.pointYoe;

                    // logger.log(`user:${user.id} - job:${job.id} - ${point.pointTotal} point`);
                    pointInserts.push(point);
                }

                // insert
                await queryRunner.manager.save(PointJobUserEntity, pointInserts);

                // next page
                currentIndex += userTake;
            }
            await queryRunner.commitTransaction();
        } catch (e) {
            logger.error(e);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    private async countUserCanMapping(queryRunner: QueryRunner, job: JobEntity) {
        return (await this.createQueryUserCanMapping(queryRunner, job))
            .getCount();
    }

    private async getUserCanMapping(queryRunner: QueryRunner, job: JobEntity, currentIndex: number, userTake: number) {
        return (await this.createQueryUserCanMapping(queryRunner, job))
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

        /**
         * InnerJoin user <-> userTag <-> tag with isApprove and exists
         * Ex: user <->  schoolSkill <-> school
         *              [fieldUser]   [fieldTag]
         *
         * @param fieldUser
         * @param fieldTag
         */
        const makeCondExists = (
            fieldUser: string,
            fieldTag: string,
            data: { [k: string]: number }[]
        ) => {
            // join check level min & max
            if (data?.length) {
                const cond = data.map((item, index) => {
                    return this.condExists(fieldUser, fieldTag, index);
                })
                const params = data.reduce((val, item, index) => {
                    const param = this.paramExists(
                        fieldUser,
                        item[fieldTag],
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
        makeCondExists('userSchools', 'school', job.jobSchools as any);

        // check job level
        // on 'userInfo'
        qr.leftJoinAndSelect('user.userInfo', 'userInfo');
        // not accept on user info
        // if (job.jobJobLevels?.length) {
        //     qr.andWhere(`userInfo.jobLevelId in (:prm_job_level)`, {
        //         prm_job_level: job.jobJobLevels.map(item => item.id).join(',')
        //     })
        // }

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
            userSchools.id is not null or
            cvWorkExperiences.workFrom.id is not null or
            cvWorkExperiences.jobLevel.id is not null or
            cvWorkExperiences.jobType.id is not null
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

    private computePointPosition(job: JobEntity, user: UserEntity) {
        return user.userPositions.reduce((val, item) => {
            val += this.pointConfig.position;
            return val;
        }, 0);
    }

    private computePointSkill(job: JobEntity, user: UserEntity) {
        return user.userSkills.reduce((val, item) => {
            val += this.pointConfig.skill;
            return val;
        }, 0);
    }

    private computePointCertificate(job: JobEntity, user: UserEntity) {
        return user.userCertificates.reduce((val, item) => {
            val += this.pointConfig.certificate;
            return val;
        }, 0);
    }

    private computePointSchool(job: JobEntity, user: UserEntity) {
        return user.userSchools.reduce((val, item) => {
            val += this.pointConfig.school;
            return val;
        }, 0);
    }

    private computePointWorkFrom(job: JobEntity, user: UserEntity) {
        return user.cvWorkExperiences.reduce((val, item) => {
            if (item.workFrom) {
                val += this.pointConfig.workFrom;
            }
            return val;
        }, 0);
    }

    private computePointJobLevel(job: JobEntity, user: UserEntity) {
        return user.cvWorkExperiences.reduce((val, item) => {
            if (item.jobLevel) {
                val += this.pointConfig.jobLevel;
            }
            return val;
        }, 0);
    }

    private computePointYoe(job: JobEntity, user: UserEntity) {
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

    private computePointJobType(job: JobEntity, user: UserEntity) {
        return user.cvWorkExperiences.reduce((val, item) => {
            if (item.jobType) {
                val += this.pointConfig.jobType;
            }
            return val;
        }, 0);
    }
}
