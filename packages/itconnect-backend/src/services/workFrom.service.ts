import { Injectable } from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SkillEntity} from "../entities/skill.entity";
import {SkillDto, SkillSearchInputDto} from "../dtos/skill.dto";
import {WorkFromEntity} from "../entities/workFrom.entity";
import {WorkFromDto, WorkFromSearchInputDto} from "../dtos/workFrom.dto";

@Injectable()
export class WorkFromService {

    constructor(
        @InjectRepository(WorkFromEntity)
        private workFromRepository: Repository<WorkFromEntity>
    ) {
    }

    async search(dtoSearch: WorkFromSearchInputDto, dtoPage: PageOptionsDto) {
        const options:  FindManyOptions<WorkFromDto> = {
            skip: dtoPage.skip,
            take: dtoPage.take,
        };

        options.where = {}
        if (dtoSearch.search) {
            options.where.companyName = Like(`%${dtoSearch.search}%`)
        }

        if (dtoPage.order_field && dtoPage.order) {
            options.order = {
                [dtoPage.order_field]: dtoPage.order
            }
        }

        const result = await this.workFromRepository.find(options);
        const total = await this.workFromRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }
}
