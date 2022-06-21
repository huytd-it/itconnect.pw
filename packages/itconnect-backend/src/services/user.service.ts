import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {DataSource, In, Repository} from "typeorm";
import {
    CreateOrEditCompanyProfileInputDto, CreateOrEditCompanyProfileOutputDto,
    CreateOrEditUserProfileInputDto,
    CreateOrUserProfileOutputDto
} from "../dtos/profile.dto";
import {UserInfoEntity} from "../entities/userInfo.entity";
import {SkillEntity} from "../entities/skill.entity";
import {UserSkillEntity} from "../entities/userSkill.entity";
import {RuntimeException} from "@nestjs/core/errors/exceptions/runtime.exception";
import {AddressEntity} from "../entities/address.entity";
import {AppRole} from "../polices/permission.enum";
import {PositionEntity} from "../entities/position.entity";
import {UserPositionEntity} from "../entities/userPosition.entity";
import {CompanyInfoEntity} from "../entities/companyInfo.entity";
import {JobLevelEntity} from "../entities/jobLevel.entity";
import {use} from "passport";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(UserInfoEntity)
        private userInfoRepository: Repository<UserInfoEntity>,
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>,
        @InjectRepository(UserSkillEntity)
        private userSkillRepository: Repository<UserSkillEntity>,
        private dataSource: DataSource,
    ) {
    }

    findOneUserInfoFull(id: number) {
        return this.userInfoRepository.findOne({
            where: {
                id
            },
            relations: ['jobLevel', 'addressProvince', 'addressDistrict', 'addressVillage']
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

    async createOrEditUser(user: UserEntity, dto: CreateOrEditUserProfileInputDto): Promise<CreateOrUserProfileOutputDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let userInfoEntity: UserInfoEntity;
            if (dto.id) {
                userInfoEntity = await queryRunner.manager.findOne(UserInfoEntity, {
                    where: {
                        user: {
                            id: user.id
                        }
                    }
                })
                if (!userInfoEntity) {
                    throw new RuntimeException('user info not exists');
                }
            } else {
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
            let companyInfoEntity: CompanyInfoEntity;
            if (dto.id) {
                companyInfoEntity = await queryRunner.manager.findOne(CompanyInfoEntity, {
                    where: {
                        user: {
                            id: user.id
                        }
                    }
                })
                if (!companyInfoEntity) {
                    throw new RuntimeException('company info not exists');
                }
            } else {
                companyInfoEntity = new CompanyInfoEntity();
            }

            /**
             * Handle user info
             *
             *
             */
            companyInfoEntity.user = user;
            companyInfoEntity.companyName = dto.companyName;
            companyInfoEntity.phone = dto.phone;
            companyInfoEntity.dayEstablish = dto.dayEstablish;
            companyInfoEntity.addressStreet = dto.addressStreet;

            const aVillage = new AddressEntity();
            aVillage.id = dto.addressVillage;
            companyInfoEntity.addressVillage = aVillage;

            const aDistrict = new AddressEntity();
            aDistrict.id = dto.addressDistrict;
            companyInfoEntity.addressDistrict = aDistrict;

            const aProvince = new AddressEntity();
            aProvince.id = dto.addressProvince;
            companyInfoEntity.addressProvince = aProvince;

            if (companyInfoEntity.id) {
                await queryRunner.manager.update(
                    CompanyInfoEntity,
                    { id: companyInfoEntity.id },
                    companyInfoEntity
                );
            } else {
                await queryRunner.manager.save(companyInfoEntity);

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
            throw new RuntimeException();
        } finally {
            await queryRunner.release();
        }
    }
}
