import {ConflictException, Injectable} from '@nestjs/common';
import {CreateOrEditTag, PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SkillEntity} from "../entities/skill.entity";
import {SkillDto, SkillSearchInputDto} from "../dtos/skill.dto";
import {WorkFromEntity} from "../entities/workFrom.entity";
import {WorkFromDto, WorkFromSearchInputDto} from "../dtos/workFrom.dto";
import {RankedAcademicEntity} from "../entities/rankedAcademic.entity";
import {RankedAcademicDto, RankedAcademicSearchInputDto} from "../dtos/rankedAcademic.dto";

@Injectable()
export class RankedAcademicService {

    constructor(
        @InjectRepository(RankedAcademicEntity)
        private rankedAcademicRepository: Repository<RankedAcademicEntity>
    ) {
    }

    async search(dtoSearch: RankedAcademicSearchInputDto, dtoPage: PageOptionsDto) {
        const options:  FindManyOptions<RankedAcademicDto> = {
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

        const result = await this.rankedAcademicRepository.find(options);
        const total = await this.rankedAcademicRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }

    async createOrEdit(data: CreateOrEditTag) {
        if (data.id) {
            const tag = await this.rankedAcademicRepository.findOne({
                where: {
                    id: data.id
                }
            })
            if (tag) {
                return await this.rankedAcademicRepository.update({ id: tag.id }, {
                    name: data.name,
                })
            }
        } else {
            const exists = await this.rankedAcademicRepository.findOne({
                where: {
                    name: data.name
                }
            })
            if (exists) {
                throw new ConflictException('Đã tồn tại');
            }
            return this.rankedAcademicRepository.save({
                name: data.name,
            })
        }
    }

}
