import { Injectable } from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SkillEntity} from "../entities/skill.entity";
import {SkillDto, SkillSearchInputDto} from "../dtos/skill.dto";
import {WorkFromEntity} from "../entities/workFrom.entity";
import {WorkFromSearchInputDto} from "../dtos/workFrom.dto";
import {JobLevelEntity} from "../entities/jobLevel.entity";
import {JobLevelDto, JobLevelSearchInputDto} from "../dtos/jobLevel.dto";

@Injectable()
export class JobLevelService {

    constructor(
        @InjectRepository(JobLevelEntity)
        private jobLevelRepository: Repository<JobLevelEntity>
    ) {
    }

    async search(dtoSearch: JobLevelSearchInputDto, dtoPage: PageOptionsDto) {
        const options:  FindManyOptions<JobLevelDto> = {
            skip: dtoPage.skip,
            take: dtoPage.take,
        };

        options.where = {}
        if (dtoSearch.search) {
            options.where.name = Like(`%${dtoSearch.search}%`)
        }

        if (dtoPage.order_field && dtoPage.order) {
            options.order = {
                [dtoPage.order_field]: dtoPage.order
            }
        }

        const result = await this.jobLevelRepository.find(options);
        const total = await this.jobLevelRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }
}
