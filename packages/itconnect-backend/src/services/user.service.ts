import {ConflictException, ForbiddenException, Injectable, ServiceUnavailableException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {DataSource, IsNull, LessThanOrEqual, MoreThanOrEqual, Not, Repository} from "typeorm";
import {
    CreateOrEditCompanyProfileInputDto,
    CreateOrEditCompanyProfileOutputDto,
    CreateOrEditUserProfileInputDto,
    CreateOrUserProfileOutputDto,
    SetAvatarBannerProfileInputDto
} from "../dtos/profile.dto";
import {UserInfoEntity} from "../entities/userInfo.entity";
import {SkillEntity} from "../entities/skill.entity";
import {UserSkillEntity} from "../entities/userSkill.entity";
import {RuntimeException} from "@nestjs/core/errors/exceptions/runtime.exception";
import {AddressEntity} from "../entities/address.entity";
import {AppRole} from "../polices/permission.enum";
import {CompanyInfoEntity} from "../entities/companyInfo.entity";
import {JobLevelEntity} from "../entities/jobLevel.entity";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import * as moment from "moment";
import {Moment} from "moment";
import {AddressService} from "./address.service";
import {Company3rdService} from "./company-3rd.service";
import {CompanyTagEntity} from "../entities/companyTag.entity";
import {Id} from "../utils/function";
import {UserSearchInputDto, UserType} from "../dtos/user.dto";
import {
    fillAllDate,
    getFormatDateGroupBy,
    PageDto,
    PageMetaDto,
    PageOptionsDto,
    StatisticGroupBy,
    StatisticOption
} from "../dtos/page.dto";
import {firstValueFrom} from "rxjs";

interface ComputeYoeData {
    data: {
        s: Moment,
        e: Moment
    }[];
    prev?: {
        s: Moment,
        e: Moment
    }
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(UserInfoEntity)
        private userInfoRepository: Repository<UserInfoEntity>,
        @InjectRepository(CompanyInfoEntity)
        private companyInfoRepository: Repository<CompanyInfoEntity>,
        @InjectRepository(CompanyTagEntity)
        private companyTagRepository: Repository<CompanyTagEntity>,
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>,
        @InjectRepository(UserSkillEntity)
        private userSkillRepository: Repository<UserSkillEntity>,
        @InjectRepository(CvWorkExperienceEntity)
        private cvWorkExperienceRepository: Repository<CvWorkExperienceEntity>,
        private dataSource: DataSource,
        private addressService: AddressService,
        private company3rdService: Company3rdService,
    ) {
    }

    findOneFull(id: number) {
        return this.usersRepository.findOne({
            where: {
                id
            },
            relations: [
                'userInfo',
                'userInfo.jobLevel',
                'userInfo.addressProvince',
                'userInfo.addressDistrict',
                'userInfo.addressVillage',
                'userInfo.banner',
                'userInfo.avatar',
                'companyInfo',
                'companyInfo.avatar',
                'companyInfo.banner',
                'companyInfo.addressProvince',
                'companyInfo.addressDistrict',
                'companyInfo.addressVillage',
            ]
        });
    }

    find(id: number) {
        return this.usersRepository.findOne({
            where: {
                id
            }
        });
    }

    findByEmail(email: string) {
        return this.usersRepository.findOne({
            where: {
                email
            }
        });
    }

    updateComputePointQueue(userId: number, id: string) {
        return this.usersRepository.update({ id: userId }, {
            computePointQueueId: id
        })
    }

    async createOrEditUser(user: UserEntity, dto: CreateOrEditUserProfileInputDto): Promise<CreateOrUserProfileOutputDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let userInfoEntity: UserInfoEntity = await queryRunner.manager.findOne(UserInfoEntity, {
                where: {
                    user: {
                        id: user.id
                    }
                }
            })
            if (!userInfoEntity) {
                userInfoEntity = new UserInfoEntity();
            }

            userInfoEntity.user = user;
            userInfoEntity.fullName = dto.fullName;
            userInfoEntity.phone = dto.phone;
            userInfoEntity.birthday = dto.birthday;
            userInfoEntity.addressStreet = dto.addressStreet;
            userInfoEntity.interest = dto.interest;
            userInfoEntity.objective = dto.objective;

            if (dto.jobLevel) {
                const jobLevel = new JobLevelEntity();
                jobLevel.id = dto.jobLevel;
                userInfoEntity.jobLevel = jobLevel;
            }

            const aVillage = new AddressEntity();
            aVillage.id = dto.addressVillage;
            userInfoEntity.addressVillage = aVillage;

            const aDistrict = new AddressEntity();
            aDistrict.id = dto.addressDistrict;
            userInfoEntity.addressDistrict = aDistrict;

            const aProvince = new AddressEntity();
            aProvince.id = dto.addressProvince;
            userInfoEntity.addressProvince = aProvince;

            if (userInfoEntity.id) {
                await queryRunner.manager.update(
                    UserInfoEntity,
                    { id: userInfoEntity.id },
                    userInfoEntity
                );
            } else {
                await queryRunner.manager.save(userInfoEntity);

                // update user role
                await queryRunner.manager.update(UserEntity, {id: user.id}, {
                    role: AppRole.user
                });
            }

            await queryRunner.commitTransaction();
            return {
                status: true
            }
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
            throw new RuntimeException();
        } finally {
            await queryRunner.release();
        }
    }

    async createOrEditCompany(user: UserEntity, dto: CreateOrEditCompanyProfileInputDto): Promise<CreateOrEditCompanyProfileOutputDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let companyInfoEntity: CompanyInfoEntity = await queryRunner.manager.findOne(CompanyInfoEntity, {
                where: {
                    user: {
                        id: user.id
                    }
                }
            })
            if (!companyInfoEntity) {
                companyInfoEntity = new CompanyInfoEntity();
            }

            /**
             * Handle user info
             *
             *
             */
            companyInfoEntity.user = user;
            companyInfoEntity.phone = dto.phone;
            companyInfoEntity.introduce = dto.introduce;


            if (companyInfoEntity.id) {
                await queryRunner.manager.update(
                    CompanyInfoEntity,
                    { id: companyInfoEntity.id },
                    companyInfoEntity
                );
            } else {
                // 3rd
                const company3rd$ = this.company3rdService.findMst(dto.companyMst);
                const company3rd = await firstValueFrom(company3rd$);
                if (!company3rd) {
                    throw new ServiceUnavailableException('Oop! Không thể đồng bộ công ty');
                }

                const address = await this.addressService.mapStringToAddressV2(
                    company3rd.address,
                    company3rd.TinhThanhTitle,
                    company3rd.QuanHuyenTitle,
                    company3rd.PhuongXaTitle
                );
                if (!address) {
                    throw new ServiceUnavailableException('Oop! address không hợp lệ')
                }

                // only check in company tag
                const exists = await queryRunner.manager.findOne(CompanyTagEntity, {
                    where: {
                        mst: company3rd.code,
                        companyInfo: {
                            id: Not(IsNull())
                        }
                    }
                })
                if (exists) {
                    throw new ConflictException('Doanh nghiệp của bạn đã được đăng kí, vui lòng contact với support@itconnect.pw để được giúp đỡ');
                }

                companyInfoEntity.mst = company3rd.code;
                companyInfoEntity.companyName = company3rd.realName;
                companyInfoEntity.addressStreet = address.street;
                companyInfoEntity.addressVillage = address.village;
                companyInfoEntity.addressDistrict = address.district;
                companyInfoEntity.addressProvince = address.province;
                companyInfoEntity.dayEstablish = company3rd.date;

                // save company info
                const infoOutput = await queryRunner.manager.save(companyInfoEntity);

                // link or update company tag
                const companyTag = await queryRunner.manager.findOne(CompanyTagEntity, {
                    where: {
                        mst: company3rd.code
                    }
                })
                if (!companyTag) {
                    const dt = new CompanyTagEntity();
                    dt.mst = company3rd.code;
                    dt.name = company3rd.realName;
                    dt.isApprove = true;
                    dt.companyInfo = <any>Id(infoOutput.id);
                    await queryRunner.manager.save(CompanyTagEntity, dt)
                } else {
                    await queryRunner.manager.update(CompanyTagEntity, Id(companyTag.id), {
                        isApprove: true,
                        companyInfo: Id(infoOutput.id)
                    })
                }

                // update user role
                await queryRunner.manager.update(UserEntity, { id: user.id }, {
                    role: AppRole.company
                });
            }

            await queryRunner.commitTransaction();
            return {
                status: true
            }
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async computeYoE(userId: number) {
        const cvWe = await this.cvWorkExperienceRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
            order: {
                startDate: 'ASC'
            }
        });

        let yoE = 0;
        let isCurrent = false;

        let combineDates = cvWe.reduce<ComputeYoeData>(
            (val, item) => {
                let e: Moment;
                let s = moment(item.startDate).startOf('month');
                if (!item.endDate) {
                    isCurrent = true;
                    e = moment().startOf('month');
                } else {
                    e = moment(item.endDate).startOf('month');
                }

                let range = { s, e };
                let isPush = true;
                if (val.prev) {
                    if (val.prev.e >= s) {
                        if (val.prev.e < e) {
                            val.prev.e = e;
                        }
                        isPush = false;
                    }
                }

                if (isPush) {
                    val.data.push(range);
                    val.prev = range;
                }

                return val;
            }
        , { data: [] });

        combineDates.data.forEach(item => {
            yoE += item.e.diff(item.s, 'month');
        })

        return this.userInfoRepository.update(
            { user: { id: userId } },
            {
                computeYoe: yoE,
                computeYoeCurrent: isCurrent,
                computeYoeDate: new Date()
            }
        )
    }

    async getComputeYoe(user: UserEntity) {
        const r = await this.userInfoRepository.findOne({
            where: {
                user: {
                    id: user.id
                }
            }
        })
        return {
            computeYoeCurrent: r.computeYoeCurrent,
            computeYoeDate: r.computeYoeDate,
            computeYoe: r.computeYoe,
        }
    }

    async setAvatarBanner(data: SetAvatarBannerProfileInputDto, user: UserEntity) {
        const d = <any>{};
        if (data.avatar) {
            // if (!(await this.fileService.owner(data.avatar))) {
            //     throw new ForbiddenException();
            // }
            d.avatar = Id(data.avatar);
        }

        if (data.banner) {
            // if (!(await this.fileService.owner(data.banner))) {
            //     throw new ForbiddenException();
            // }
            d.banner = Id(data.banner);
        }

        if (user.role === AppRole.user) {
            return this.userInfoRepository.update({
                user: Id(user.id)
            }, d)
        }

        if (user.role === AppRole.company) {
            return this.companyInfoRepository.update({
                user: Id(user.id)
            }, d)
        }
    }

    getOne(id: number) {
        return this.usersRepository.findOne({
            where: {
                id
            },
            relations: [
                'userInfo',
                'userInfo.jobLevel',
                'userInfo.addressProvince',
                'userInfo.addressDistrict',
                'userInfo.addressVillage',
                'userInfo.banner',
                'userInfo.avatar',
                'companyInfo',
                'companyInfo.avatar',
                'companyInfo.banner',
                'companyInfo.addressProvince',
                'companyInfo.addressDistrict',
                'userSkills',
                'userSkills.skill',
                'userPositions',
                'userPositions.position',
                'cvEducations',
                'cvEducations.school',
                'cvEducations.rankedAcademic',
                'cvWorkExperiences',
                'cvWorkExperiences.companyTag.companyInfo',
                'cvWorkExperiences.jobType',
                'cvWorkExperiences.jobLevel',
                'cvWorkExperiences.workFrom',
                'cvWorkExperiences.cvWorkExperienceSkills.skill',
                'cvWorkExperiences.cvWorkExperiencePositions.position',
                'cvCertificates',
                'cvCertificates.certificate',
            ],
            order: {
                cvWorkExperiences: {
                    startDate: 'DESC'
                },
                cvEducations: {
                    startDate: 'DESC'
                },
                cvCertificates: {
                    year: 'DESC'
                }
            }
        });
    }

    async delete(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                id
            },
            loadRelationIds: true
        })

        if (user.role === AppRole.company) {
            // unlink company tag
            await this.companyTagRepository.update({
                companyInfo: Id(user.companyInfo as any)
            }, {
                companyInfo: null
            });

        }
        return this.usersRepository.softDelete({
            id
        })
    }

    async unban(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                id
            },
            relations: ['companyInfo', 'userInfo']
        })

        if (user.role !== AppRole.ban) {
            throw new ForbiddenException();
        }

        // link to company tag
        if (user.companyInfo) {
            const exists = await this.companyTagRepository.findOne({
                where: {
                    mst: user.companyInfo.mst
                },
                loadRelationIds: true
            })
            if (exists.companyInfo) {
                throw new ConflictException('Trùng công ty, cần cấm hoặc xóa công ty bị trùng lập')
            }

            await this.companyTagRepository.update({
                mst: user.companyInfo.mst
            }, {
                companyInfo: Id(user.companyInfo.id)
            });
        }

        return this.usersRepository.update({ id }, {
            role: user.userInfo ? AppRole.user
                : user.companyInfo ? AppRole.company
                    : AppRole.begin
        })
    }

    async ban(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                id
            },
            loadRelationIds: true
        })

        if (user.role === AppRole.company) {
            // unlink company tag
            await this.companyTagRepository.update({
                companyInfo: Id(user.companyInfo as any)
            }, {
                companyInfo: null
            });
        }

        return this.usersRepository.update({ id }, {
            role: AppRole.ban
        })
    }

    async search(search: UserSearchInputDto, page: PageOptionsDto) {
        const qr = this.usersRepository.createQueryBuilder('user');
        if (search.type == UserType.User) {
            qr.innerJoinAndSelect('user.userInfo', 'userInfo')
            qr.leftJoinAndSelect('userInfo.avatar', 'avatarU')
            qr.leftJoinAndSelect('userInfo.banner', 'bannerU')
            if (search.search) {
                qr.andWhere(`
                  (user.email like :prm_search or
                  userInfo.fullName like :prm_search)
                `,{ prm_search: `%${search.search}%` })
            }
        }

        if (search.type == UserType.Company) {
            qr.innerJoinAndSelect('user.companyInfo', 'companyInfo')
            qr.leftJoinAndSelect('companyInfo.avatar', 'avatarC')
            qr.leftJoinAndSelect('companyInfo.banner', 'bannerC')
            if (search.search) {
                qr.andWhere(`
                  user.email like :prm_search or
                  companyInfo.companyName like :prm_search
                `,{ prm_search: `%${search.search}%` })
            }
        }

        const total = await qr.getCount();

        if (page.order_field && page.order) {
            qr.orderBy(page.order_field, page.order)
        }
        qr.skip(page.skip)
        qr.take(page.take)
        const result = await qr.getMany();

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: page });
        return new PageDto(result, meta)
    }

    async sts(query: StatisticOption) {
        const qrView = this.usersRepository.createQueryBuilder('u');
        qrView.select(`
            DATE_FORMAT(u.createdAt,:prm_group) legend,
            COUNT(*) countAllUser,
            SUM(case when u.role = :prm_role_company then 1 else 0 end) countCompany, 
            SUM(case when u.role = :prm_role_user then 1 else 0 end) countUser 
        `);
        qrView.setParameter('prm_group', getFormatDateGroupBy(query.group));
        qrView.setParameter('prm_role_company', AppRole.company);
        qrView.setParameter('prm_role_user', AppRole.user);
        qrView.groupBy('legend')
        qrView.orderBy('u.createdAt', 'DESC')


        const qrFillDate = this.usersRepository.createQueryBuilder('u')

        if (query.jobId) {
            qrView.andWhere({
                job: Id(query.jobId)
            })
            qrFillDate.andWhere({
                job: Id(query.jobId)
            })
        }

        if (!query.start) {
            qrFillDate.select('min(u.createdAt) date');
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
            qrFillDate.select('max(u.createdAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                query.end = moment(r.date).toDate()
            }
        }else {
            qrView.andWhere({
                createdAt: LessThanOrEqual(moment(query.end).toDate())
            })
        }

        const view = await qrView.getRawMany();

        return fillAllDate(view, query.start, query.end, query.group);
    }

    async stsBan(query: StatisticOption) {
        const qrView = this.usersRepository.createQueryBuilder('u');
        qrView.select(`
            DATE_FORMAT(u.createdAt,:prm_group) legend,
            SUM(case when companyInfo.id is not null then 1 else 0 end) countBanCompany, 
            SUM(case when userInfo.id is not null then 1 else 0 end) countBanUser 
        `);
        qrView.leftJoin('u.userInfo', 'userInfo');
        qrView.leftJoin('u.companyInfo', 'companyInfo');
        qrView.setParameter('prm_group', getFormatDateGroupBy(query.group));
        qrView.groupBy('legend')
        qrView.orderBy('u.updatedAt', 'DESC')
        qrView.andWhere('u.role = :prm_role_ban');
        qrView.setParameter('prm_role_ban', AppRole.ban);


        const qrFillDate = this.usersRepository.createQueryBuilder('u')
        qrFillDate.andWhere('u.role = :prm_role_ban');
        qrFillDate.setParameter('prm_role_ban', AppRole.ban);

        if (query.jobId) {
            qrView.andWhere({
                job: Id(query.jobId)
            })
            qrFillDate.andWhere({
                job: Id(query.jobId)
            })
        }

        if (!query.start) {
            qrFillDate.select('min(u.createdAt) date');
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
            qrFillDate.select('max(u.createdAt) date');
            const r =  await qrFillDate.getRawOne();
            if (r.date) {
                query.end = moment(r.date).toDate()
            }
        }else {
            qrView.andWhere({
                createdAt: LessThanOrEqual(moment(query.end).toDate())
            })
        }

        const view = await qrView.getRawMany();

        return fillAllDate(view, query.start, query.end, query.group);
    }

}
