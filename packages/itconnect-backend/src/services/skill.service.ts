import { Injectable } from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SkillEntity} from "../entities/skill.entity";
import {SkillDto, SkillSearchInputDto} from "../dtos/skill.dto";

@Injectable()
export class SkillService {

    constructor(
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>
    ) {
    }

    async search(dtoSearch: SkillSearchInputDto, dtoPage: PageOptionsDto) {
        const options:  FindManyOptions<SkillDto> = {
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

        const result = await this.skillRepository.find(options);
        const total = await this.skillRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }
}
