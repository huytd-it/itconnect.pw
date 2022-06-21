import { Injectable } from '@nestjs/common';
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CertificateEntity} from "../entities/certificate.entity";
import {CertificateDto, CertificateSearchInputDto} from "../dtos/certificate.dto";

@Injectable()
export class CertificateService {

    constructor(
        @InjectRepository(CertificateEntity)
        private certificateRepository: Repository<CertificateEntity>
    ) {
    }

    async search(dtoSearch: CertificateSearchInputDto, dtoPage: PageOptionsDto) {
        const options:  FindManyOptions<CertificateDto> = {
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

        const result = await this.certificateRepository.find(options);
        const total = await this.certificateRepository.count({
            where: options.where
        });

        const meta = new PageMetaDto({ itemCount: total, pageOptionDto: dtoPage });
        return new PageDto(result, meta)
    }
}
