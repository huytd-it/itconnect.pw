import { Injectable } from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {JobTypeEntity} from "../entities/jobType.entity";
import {JobTypeDto, JobTypeSearchInputDto} from "../dtos/jobType.dto";

@Injectable()
export class JobTypeService {

    constructor(
        @InjectRepository(JobTypeEntity)
        private jobTypeRepository: Repository<JobTypeEntity>
    ) {
    }

    async search(dtoSearch: JobTypeSearchInputDto, dtoPage: PageOptionsDto) {
        const options:  FindManyOptions<JobTypeDto> = {
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

        const result = await this.jobTypeRepository.find(options);
        const total = await this.jobTypeRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }
}
