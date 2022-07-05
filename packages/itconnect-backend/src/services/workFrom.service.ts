import {ConflictException, Injectable} from '@nestjs/common';
import {CreateOrEditTag, PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
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
            options.where.name = Like(`%${dtoSearch.search}%`)
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

    async createOrEdit(data: CreateOrEditTag) {
        if (data.id) {
            const tag = await this.workFromRepository.findOne({
                where: {
                    id: data.id
                }
            })
            if (tag) {
                return await this.workFromRepository.update({ id: tag.id }, {
                    name: data.name,
                })
            }
        } else {
            const exists = await this.workFromRepository.findOne({
                where: {
                    name: data.name
                }
            })
            if (exists) {
                throw new ConflictException('Đã tồn tại');
            }
            return this.workFromRepository.save({
                name: data.name,
            })
        }
    }

}
