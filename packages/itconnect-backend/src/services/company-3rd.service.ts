import {BadRequestException, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {finalize, map} from "rxjs";
import * as moment from "moment";
import {Company3Rd, Company3RdSearchInputDto} from "../dtos/company-3rd.dto";
import {PageDto, PageMetaDto, PageOptionsDto} from "../dtos/page.dto";
import {RuntimeException} from "@nestjs/core/errors/exceptions/runtime.exception";

@Injectable()
export class Company3rdService {
    readonly API_URL = 'https://thongtindoanhnghiep.co/api/';

    constructor(
        private readonly httpClient: HttpService
    ) {
    }

    search(search: Company3RdSearchInputDto, page: PageOptionsDto) {
        const query = {
            k: search.search,
            r: page.take,
            p: page.page
        };

        const uri = `${this.API_URL}/company`;
        return this.httpClient.get(uri, { params: query })
            .pipe(map(({data}) => {
                const {LtsItems, Option} = data;
                if (!LtsItems || !Option) {
                    throw new RuntimeException();
                }

                const total = Option['TotalRow']
                const items = this.formatData(...LtsItems);
                const meta = new PageMetaDto({ itemCount: total, pageOptionDto: page })
                return new PageDto(items, meta);
            }))
    }

    findMst(mst: string) {
        return this.search({ search: mst }, <any>{ take: 1, page: 1 })
            .pipe(map(data => {
                if (data.data?.length) {
                    const item = data.data[0];
                    if (item.code === mst) {
                        return item;
                    }
                }
                return false;
            }));
    }

    formatData(...items: any[]) {
        return items.map(item => {
            if (!item) {
                return null;
            }
            return {
                code: item['MaSoThue'],
                name: item['Title'],
                address: item['DiaChiCongTy'],
                date: moment(item['NgayCap']).toDate()
            }
        })
    }

    getCity() {
        return this.httpClient.get(this.API_URL + '/city')
            .pipe(map(data => {
                return data.data['LtsItem'] as { ID: number, Title: string }[];
            }));
    }

    getDistrict(id: number) {
        return this.httpClient.get(this.API_URL + '/city/' + id + '/district')
            .pipe(map(data => {
                return data.data as { ID: number, Title: string }[];
            }));
    }


    getVillage(id: number) {
        return this.httpClient.get(this.API_URL + '/district/' + id + '/ward')
            .pipe(map(data => {
                return data.data as { ID: number, Title: string }[];
            }));
    }

}
