import {ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {CreateOrEditCvWorkExperienceDto} from "../dtos/cv-work-experience.dto";
import {UserEntity} from "../entities/user.entity";
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {DeepPartial, Repository} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {CompanyTagService} from "./company-tag.service";
import {UserService} from "./user.service";

@Injectable({ scope: Scope.REQUEST })
export class CvWorkExperienceService {

    constructor(
        @InjectRepository(CvWorkExperienceEntity)
        private cvWorkExperienceRepository: Repository<CvWorkExperienceEntity>,
        @Inject(REQUEST) private request: Request,
        private companyTagService: CompanyTagService,
        private userService: UserService
    ) {
    }

    isOwner(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvWorkExperienceRepository.findOne({
            where: {
                id,
                user: { id: currentUser.id }
            }
        })
    }

    getOwner() {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvWorkExperienceRepository.find({
            where: {
                user: { id: currentUser.id }
            },
            order: {
                startDate: 'DESC'
            },
            relations: [
                'companyTag',
                'jobLevel',
                'jobType',
                'workFrom',
                'cvWorkExperienceSkills',
                'cvWorkExperienceSkills.skill',
                'cvWorkExperiencePositions',
                'cvWorkExperiencePositions.position',
            ]
        })
    }

    async createOrEdit(data: CreateOrEditCvWorkExperienceDto) {
        const currentUser = this.request['user'] as UserEntity;
        let upId = data.id;

        const dataUpdate: DeepPartial<CvWorkExperienceEntity> = {
            startDate: data.startDate,
            endDate: data.endDate || null,
            jobLevel: data.jobLevel ? { id: data.jobLevel } : null,
            jobType: data.jobType ? { id: data.jobType } : null,
            workFrom: data.workFrom ? { id: data.workFrom } : null,
            content: data.content,
        };

        if (data.companyTag) {
            const tGlobal = await this.companyTagService.isApprove(data.companyTag);
            if (!tGlobal) {
                const tOwner = await this.companyTagService.isOwner(data.companyTag);
                if (!tOwner) {
                    throw new ForbiddenException();
                }
            }
            dataUpdate.companyTag = { id: data.companyTag };
        }

        if (data.id) {
            const cv = await this.cvWorkExperienceRepository.findOne({
                where: {
                    user: { id: currentUser.id },
                    id: upId
                }
            })
            if (!cv) {
                throw new ForbiddenException();
            }
            await this.cvWorkExperienceRepository.update(
                { id: upId },
                dataUpdate
            );
        } else {
            const cv = await this.cvWorkExperienceRepository.save([
                {...dataUpdate, user: { id: currentUser.id } }
            ]);
            upId = cv[0].id;
        }

        // re-compute yoe
        await this.userService.computeYoE(currentUser.id);

        return this.cvWorkExperienceRepository.findOne({
            where: {
                id: upId
            },
            relations: [
                'companyTag',
                'jobLevel',
                'jobType',
                'workFrom',
                'cvWorkExperienceSkills',
                'cvWorkExperienceSkills.skill',
                'cvWorkExperiencePositions',
                'cvWorkExperiencePositions.position',
            ]
        })
    }

    async delete(id: number) {
        const owner = await this.isOwner(id);
        if (owner) {
            // soft delete
            // if force need remove all ...skill & ...position
            const result = await this.cvWorkExperienceRepository.softRemove(owner);

            // re-compute yoe
            const currentUser = this.request['user'] as UserEntity;
            await this.userService.computeYoE(currentUser.id);

            return result;
        }
        throw new ForbiddenException();
    }
}
