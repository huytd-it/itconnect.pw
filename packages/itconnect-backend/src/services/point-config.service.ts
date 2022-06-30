import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {POINT_DEFAULT, PointConfigEntity, PointConfigType} from "../entities/pointConfig.entity";
import {Repository} from "typeorm";

export type PointConfigKV = {
    [key in PointConfigType]: number;
}

@Injectable()
export class PointConfigService {

    constructor(
        @InjectRepository(PointConfigEntity)
        private pointConfigRepository: Repository<PointConfigEntity>
    ) {
    }

    async getConfig() {
        const r = await this.pointConfigRepository.find();
        let mapToConfig = Object.values(PointConfigType).reduce<PointConfigKV>((val, item) => {
            val[item] = POINT_DEFAULT;
            return val;
        }, {} as any);
        mapToConfig = r.reduce<PointConfigKV>((val, item) => {
            val[item.type] = item.point;
            return val;
        }, mapToConfig)
        return mapToConfig;
    }
}
