import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AddressEntity, EAddressType} from "../entities/address.entity";
import {DataSource, FindManyOptions, Like, Repository} from "typeorm";
import {AddressSearchInputDto} from "../dtos/address.dto";
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {Company3rdService} from "./company-3rd.service";
import {Id} from "../utils/function";

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,
        private company3rdService: Company3rdService,
        private dataSource: DataSource
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
            options.where.parent = {
                id: dtoSearch.parentId
            };
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

    trimAddress(str: string) {
        return str.trim()
            .replace(/(tính)|(thành phố)|(tp)/gmi, '')
            .replace(/(huyện)|(thị trấn)/gmi, '')
            .replace(/(xã)|(phường)/gmi, '');
    }

    async mapStringToAddress(addressStr: string) {
        const stringSplit = addressStr.split(',');
        const provinceStr = this.trimAddress(stringSplit[3]);
        const districtStr = this.trimAddress(stringSplit[2]);
        const villageStr = this.trimAddress(stringSplit[1]);
        const street = stringSplit[0].trim();

        // find province
        const province = await this.addressRepository.findOne({
            where: {
                name: Like('%' + provinceStr + '%'),
                type: EAddressType.province
            }
        })
        if (!province) {
            return;
        }

        const district = await this.addressRepository.findOne({
            where: {
                name: Like('%' + districtStr + '%'),
                type: EAddressType.district,
                parent: Id(province.id)
            }
        })
        if (!district) {
            return;
        }

        const village = await this.addressRepository.findOne({
            where: {
                name: Like('%' + villageStr + '%'),
                type: EAddressType.village,
                parent: Id(district.id)
            }
        })
        if (!village) {
            return;
        }

        return {
            province,
            district,
            village,
            street,
        }
    }

    async syncAddress() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction()
        try {
            const city = await this.company3rdService.getCity().toPromise();
            for (let province of city) {
                if (province.Title === 'Chưa rõ') {
                    continue;
                }
                let oldP = await this.addressRepository.findOne({
                    where: {
                        name: province.Title,
                        type: EAddressType.province
                    }
                })
                if (!oldP) {
                    oldP = await this.dataSource.manager.save(AddressEntity, {
                        name: province.Title,
                        type: EAddressType.province
                    })
                }

                // district
                const districts = await this.company3rdService.getDistrict(province.ID).toPromise()
                for (let district of districts) {
                    if (district.Title === 'Chưa rõ') {
                        continue;
                    }
                    let oldD = await this.addressRepository.findOne({
                        where: {
                            name: district.Title,
                            type: EAddressType.district,
                            parent: {
                                id: oldP.id
                            }
                        }
                    })
                    if (!oldD) {
                        oldD = await this.dataSource.manager.save(AddressEntity, {
                            name: district.Title,
                            type: EAddressType.district,
                            parent: {
                                id: oldP.id
                            }
                        })
                    }

                    // village
                    const villages = await this.company3rdService.getVillage(district.ID).toPromise()
                    for (let village of villages) {
                        if (village.Title === 'Chưa rõ') {
                            continue;
                        }
                        const oldV = await this.addressRepository.findOne({
                            where: {
                                name: village.Title,
                                type: EAddressType.village,
                                parent:{
                                    id: oldD.id
                                }
                            }
                        })
                        if (!oldV) {
                            await this.dataSource.manager.save(AddressEntity, {
                                name: village.Title,
                                type: EAddressType.village,
                                parent: {
                                    id: oldD.id
                                }
                            })
                        }
                    }
                }
            }
            await queryRunner.commitTransaction();
        } catch (e) {
            console.log(e);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
