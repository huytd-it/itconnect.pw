import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {DataSource, In, Repository} from "typeorm";
import {
    CompleteCompanyProfileInputDto, CompleteCompanyProfileOutputDto,
    CompleteUserProfileInputDto,
    CompleteUserProfileOutputDto
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

    async completeProfile(user: UserEntity, dto: CompleteUserProfileInputDto): Promise<CompleteUserProfileOutputDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            /**
             * Handle skill
             *
             *
             */
            const skills = await queryRunner.manager.find(SkillEntity, {
                where: {
                    name: In(dto.skills)
                }
            })

            const appSkills = skills.map(item => item.name);
            const userSkills = dto.skills.filter(item => !appSkills.includes(item));

            // insert user skills - app owner
            for (let appSkill of skills) {
                const entity = new UserSkillEntity();
                entity.name = appSkill.name;
                entity.skill = appSkill;
                await queryRunner.manager.save(entity);
            }


            // insert user skill
            for (let userSkill of userSkills) {
                const entity = new UserSkillEntity();
                entity.name = userSkill;
                await queryRunner.manager.save(entity);
            }

            /***
             * Handle position
             *
             *
             */
            const positions = await queryRunner.manager.find(PositionEntity, {
                where: {
                    name: In(dto.skills)
                }
            })

            const appPositions = skills.map(item => item.name);
            const userPositions = dto.skills.filter(item => !appPositions.includes(item));

            // insert user positions - app owner
            for (let appPosition of positions) {
                const entity = new UserPositionEntity();
                entity.name = appPosition.name;
                entity.position = appPosition;
                await queryRunner.manager.save(entity);
            }


            // insert user positions
            for (let userPosition of userPositions) {
                const entity = new UserPositionEntity();
                entity.name = userPosition;
                await queryRunner.manager.save(entity);
            }

            /**
             * Handle user info
             *
             *
             */
            const userInfoEntity = new UserInfoEntity();
            userInfoEntity.user = user;
            userInfoEntity.phone = dto.phone;
            userInfoEntity.birthday = dto.birthday;
            userInfoEntity.addressStreet = dto.addressStreet;

            const aVillage = new AddressEntity();
            aVillage.id = dto.addressVillage;
            userInfoEntity.addressVillage = aVillage;

            const aDistrict = new AddressEntity();
            aDistrict.id = dto.addressDistrict;
            userInfoEntity.addressDistrict = aDistrict;

            const aProvince = new AddressEntity();
            aProvince.id = dto.addressProvince;
            userInfoEntity.addressProvince = aProvince;
            await queryRunner.manager.save(userInfoEntity);

            // update user role
            await queryRunner.manager.update(UserEntity, { id: user.id }, {
                role: AppRole.user
            });

            await queryRunner.commitTransaction();
            return {
                status: true
            }
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new RuntimeException();
        } finally {
            await queryRunner.release();
        }
    }

    async completeCompany(user: UserEntity, dto: CompleteCompanyProfileInputDto): Promise<CompleteCompanyProfileOutputDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            /**
             * Handle user info
             *
             *
             */
            const companyInfoEntity = new CompanyInfoEntity();
            companyInfoEntity.user = user;
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
            await queryRunner.manager.save(companyInfoEntity);

            // update user role
            await queryRunner.manager.update(UserEntity, { id: user.id }, {
                role: AppRole.company
            });

            await queryRunner.commitTransaction();
            return {
                status: true
            }
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new RuntimeException();
        } finally {
            await queryRunner.release();
        }
    }
}
