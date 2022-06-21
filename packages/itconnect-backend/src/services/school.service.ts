import { Injectable } from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SkillEntity} from "../entities/skill.entity";
import {SkillDto, SkillSearchInputDto} from "../dtos/skill.dto";
import {SchoolEntity} from "../entities/school.entity";
import {SchoolSearchInputDto} from "../dtos/school.dto";

@Injectable()
export class SchoolService {

    constructor(
        @InjectRepository(SchoolEntity)
        private schoolRepository: Repository<SchoolEntity>
    ) {
    }

    async search(dtoSearch: SchoolSearchInputDto, dtoPage: PageOptionsDto) {
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

        const result = await this.schoolRepository.find(options);
        const total = await this.schoolRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }
}
