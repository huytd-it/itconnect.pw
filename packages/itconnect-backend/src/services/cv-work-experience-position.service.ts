import {
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
    Request,
    Scope
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeepPartial, Repository} from "typeorm";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {CvWorkExperiencePositionEntity} from "../entities/cvWorkExperiencePosition.entity";
import {CreateOrEditCvWorkExperiencePositionDto} from "../dtos/cv-work-experience-position.dto";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {PositionService} from "./position.service";
import {CvWorkExperienceService} from "./cv-work-experience.service";

@Injectable({ scope: Scope.REQUEST })
export class CvWorkExperiencePositionService {

    constructor(
        @InjectRepository(CvWorkExperiencePositionEntity)
        private cvWorkExperiencePositionRepository: Repository<CvWorkExperiencePositionEntity>,
        @InjectRepository(CvWorkExperienceEntity)
        private cvWorkExperienceRepository: Repository<CvWorkExperienceEntity>,
        private positionService: PositionService,
        private cvWorkExperienceService: CvWorkExperienceService,
        @Inject(REQUEST) private request: Request
    ) {
    }

    private owner(cvWorkExperience: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.cvWorkExperienceRepository.findOne({
            where: {
                id: cvWorkExperience,
                user: { id: currentUser.id }
            }
        })
    }

    async createOrEdit(dto: CreateOrEditCvWorkExperiencePositionDto) {
        let upId = dto.id;
        let data: DeepPartial<CvWorkExperiencePositionEntity> = {};

        // check owner position
        if (dto.position) {
            const positionGlobal = await this.positionService.isApprove(dto.position);
            if (!positionGlobal) {
                const positionOwner = await this.positionService.isOwner(dto.position);
                if (!positionOwner) {
                    throw new ForbiddenException();
                }
            }

            data.position = { id: dto.position };
        }

        // check owner cv exp...
        if (dto.cvWorkExperience) {
            const cvWorkExperience = await  this.cvWorkExperienceService.isOwner(dto.cvWorkExperience);
            if (!cvWorkExperience) {
                throw new ForbiddenException();
            }
            data.cvWorkExperience = { id: dto.cvWorkExperience };
        }

        if (dto.id) {
            // update
            const cvWePosition = await this.cvWorkExperiencePositionRepository.findOne({
                where: {
                    id: dto.id
                },
                loadRelationIds: true
            })
            const cvWe = await this.cvWorkExperienceService.isOwner(cvWePosition.cvWorkExperience as unknown as number);
            if (!cvWe) {
                throw new ForbiddenException();
            }

            await this.cvWorkExperiencePositionRepository.update(
                { id: dto.id },
                data
            );
        } else {
            // check unique
            const unique = await this.cvWorkExperiencePositionRepository.findOne({
                where: {
                    position: { id: dto.position },
                    cvWorkExperience: { id: dto.cvWorkExperience }
                }
            })
            if (unique) {
                throw new ConflictException();
            }

            //create
            const d = await this.cvWorkExperiencePositionRepository.save([data]);
            upId = d[0].id
        }

        return this.cvWorkExperiencePositionRepository.findOne({
            where: {
                id: upId
            },
            relations: ['position']
        })
    }

    async delete(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        let exists = await this.cvWorkExperiencePositionRepository.findOne({
            where: {
                id
            },
            loadRelationIds: true
        })
        if (exists) {
            if (await this.owner(exists.cvWorkExperience as unknown as number)) {
                return await this.cvWorkExperiencePositionRepository.delete(id);
            }
        }

        throw new ForbiddenException();
    }

}
