import {
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
    Request,
    Scope
} from '@nestjs/common';
import {CreateOrEditUserSkillDto} from "../dtos/user-skill.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserSkillEntity} from "../entities/userSkill.entity";
import {DeepPartial, Repository} from "typeorm";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {CvWorkExperienceSkillEntity} from "../entities/cvWorkExperienceSkill.entity";
import {CreateOrEditCvWorkExperienceSkillDto} from "../dtos/cv-work-experience-skill.dto";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";
import {UserTaggedSkillEntity} from "../entities/userTaggedSkill.entity";
import {SkillEntity} from "../entities/skill.entity";
import {SkillService} from "./skill.service";
import {UserSkillService} from "./user-skill.service";
import {CvWorkExperienceService} from "./cv-work-experience.service";

@Injectable({ scope: Scope.REQUEST })
export class CvWorkExperienceSkillService {

    constructor(
        @InjectRepository(CvWorkExperienceSkillEntity)
        private cvWorkExperienceSkillRepository: Repository<CvWorkExperienceSkillEntity>,
        @InjectRepository(CvWorkExperienceEntity)
        private cvWorkExperienceRepository: Repository<CvWorkExperienceEntity>,
        private skillService: SkillService,
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

    async createOrEdit(dto: CreateOrEditCvWorkExperienceSkillDto) {
        let upId = dto.id;
        let data: DeepPartial<CvWorkExperienceSkillEntity> = {};

        // check owner skill
        if (dto.skill) {
            // const skillGlobal = await this.skillService.isApprove(dto.skill);
            // if (!skillGlobal) {
            //     const skillOwner = await this.skillService.isOwner(dto.skill);
            //     if (!skillOwner) {
            //         throw new ForbiddenException();
            //     }
            // }

            data.skill = { id: dto.skill };
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
            const cvWeSkill = await this.cvWorkExperienceSkillRepository.findOne({
                where: {
                    id: dto.id
                },
                loadRelationIds: true
            })
            const cvWe = await this.cvWorkExperienceService.isOwner(cvWeSkill.cvWorkExperience as unknown as number);
            if (!cvWe) {
                throw new ForbiddenException();
            }

            await this.cvWorkExperienceSkillRepository.update(
                { id: dto.id },
                data
            );
        } else {
            // check unique
            const unique = await this.cvWorkExperienceSkillRepository.findOne({
                where: {
                    skill: { id: dto.skill },
                    cvWorkExperience: { id: dto.cvWorkExperience }
                }
            })
            if (unique) {
                throw new ConflictException();
            }

            //create
            const d = await this.cvWorkExperienceSkillRepository.save([data]);
            upId = d[0].id
        }

        return this.cvWorkExperienceSkillRepository.findOne({
            where: {
                id: upId
            },
            relations: ['skill']
        })
    }

    async delete(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        let exists = await this.cvWorkExperienceSkillRepository.findOne({
            where: {
                id
            },
            loadRelationIds: true
        })
        if (exists) {
            if (await this.owner(exists.cvWorkExperience as unknown as number)) {
                return await this.cvWorkExperienceSkillRepository.delete(id);
            }
        }

        throw new ForbiddenException();
    }

}
