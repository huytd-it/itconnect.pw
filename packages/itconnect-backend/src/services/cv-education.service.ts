import {ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {UserEntity} from "../entities/user.entity";
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {DeepPartial, Repository} from "typeorm";
import {UserService} from "./user.service";
import {CvEducationEntity} from "../entities/cvEducation.entity";
import {SchoolService} from "./school.service";
import {CreateOrEditCvEducationDto} from "../dtos/cv-education.dto";

@Injectable({ scope: Scope.REQUEST })
export class CvEducationService {

    constructor(
        @InjectRepository(CvEducationEntity)
        private cvEducationRepository: Repository<CvEducationEntity>,
        @Inject(REQUEST) private request: Request,
        private userService: UserService,
        private schoolService: SchoolService
    ) {
    }

    isOwner(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvEducationRepository.findOne({
            where: {
                id,
                user: { id: currentUser.id }
            }
        })
    }

    getOwner() {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvEducationRepository.find({
            where: {
                user: { id: currentUser.id }
            },
            order: {
                startDate: 'DESC'
            },
            relations: [
                'rankedAcademic',
                'school',
            ]
        })
    }

    async createOrEdit(data: CreateOrEditCvEducationDto) {
        const currentUser = this.request['user'] as UserEntity;
        let upId = data.id;

        const dataUpdate: DeepPartial<CvEducationEntity> = {
            startDate: data.startDate,
            endDate: data.endDate || null,
            rankedAcademic: data.rankedAcademic ? { id: data.rankedAcademic } : null,
            content: data.content,
        };

        if (data.school) {
            const tGlobal = await this.schoolService.isApprove(data.school);
            if (!tGlobal) {
                const tOwner = await this.schoolService.isOwner(data.school);
                if (!tOwner) {
                    throw new ForbiddenException();
                }
            }
            dataUpdate.school = { id: data.school };
        }

        if (data.id) {
            const cv = await this.cvEducationRepository.findOne({
                where: {
                    user: { id: currentUser.id },
                    id: upId
                }
            })
            if (!cv) {
                throw new ForbiddenException();
            }
            await this.cvEducationRepository.update(
                { id: upId },
                dataUpdate
            );
        } else {
            const cv = await this.cvEducationRepository.save([
                {...dataUpdate, user: { id: currentUser.id } }
            ]);
            upId = cv[0].id;
        }

        return this.cvEducationRepository.findOne({
            where: {
                id: upId
            },
            relations: [
                'rankedAcademic',
                'school',
            ]
        })
    }

    async delete(id: number) {
        const owner = await this.isOwner(id);
        if (owner) {
            // soft delete
            // if force need remove all ...skill & ...position
            const result = await this.cvEducationRepository.softRemove(owner);

            return result;
        }
        throw new ForbiddenException();
    }
}
