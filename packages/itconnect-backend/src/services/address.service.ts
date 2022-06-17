import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AddressEntity} from "../entities/address.entity";
import {FindManyOptions, Like, Repository} from "typeorm";
import {AddressSearchInputDto} from "../dtos/address.dto";
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {count} from "rxjs";

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>
    ) {
    }


    async search(dtoSearch: AddressSearchInputDto, dtoPage: PageOptionsDto) {
        const options:  FindManyOptions<AddressEntity> = {
            skip: dtoPage.skip,
            take: dtoPage.take,
        };

        options.where = {}
        if (dtoSearch.search) {
            options.where.name = Like(`%${dtoSearch.search}%`)
        }

        if (dtoSearch.type) {
            options.where.type = dtoSearch.type
        }

        if (dtoSearch.parentId) {
            options.where['parentId'] = dtoSearch.parentId
        }

        if (dtoPage.order_field && dtoPage.order) {
            options.order = {
                [dtoPage.order_field]: dtoPage.order
            }
        }

        const result = await this.addressRepository.find(options);
        const total = await this.addressRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }
}
