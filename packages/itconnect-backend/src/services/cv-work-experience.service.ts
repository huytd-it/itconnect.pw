import {ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {CreateOrEditCvWorkExperienceDto} from "../dtos/cv-work-experience.dto";
import {UserEntity} from "../entities/user.entity";
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {DeepPartial, Repository} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

@Injectable({ scope: Scope.REQUEST })
export class CvWorkExperienceService {

    constructor(
        @InjectRepository(CvWorkExperienceEntity)
        private cvWorkExperienceRepository: Repository<CvWorkExperienceEntity>,
        @Inject(REQUEST) private request: Request
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
            endDate: data.endDate,
            companyTag: { id: data.companyTag },
            jobLevel: { id: data.jobLevel },
            workFrom: { id: data.workFrom },
            content: data.content,
        };

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

        return this.cvWorkExperienceRepository.findOne({
            where: {
                id: upId
            },
            relations: [
                'companyTag',
                'jobLevel',
                'workFrom',
                'cvWorkExperienceSkills',
                'cvWorkExperienceSkills.skill',
                'cvWorkExperiencePositions',
                'cvWorkExperiencePositions.position',
            ]
        })
    }
}
