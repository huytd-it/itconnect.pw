import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PositionEntity} from "../entities/position.entity";
import {FindManyOptions, Like, Repository} from "typeorm";
import {SkillDto, SkillSearchInputDto} from "../dtos/skill.dto";
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {PositionDto, PositionSearchInputDto} from "../dtos/position.dto";

@Injectable()
export class PositionService {

    constructor(
        @InjectRepository(PositionEntity)
        private positionRepository: Repository<PositionEntity>
    ) {
    }

    async search(dtoSearch: PositionSearchInputDto, dtoPage: PageOptionsDto) {
        const options:  FindManyOptions<PositionDto> = {
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

        const result = await this.positionRepository.find(options);
        const total = await this.positionRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }

}
