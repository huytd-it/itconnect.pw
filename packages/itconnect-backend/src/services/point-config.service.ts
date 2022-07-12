import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {
    POINT_DEFAULT,
    POINT_EXT_DEFAULT,
    POINT_EXT_VERIFIED_DEFAULT,
    PointConfigEntity,
    PointConfigType
} from "../entities/pointConfig.entity";
import {Repository} from "typeorm";

export type PointConfigV = {
    point: number,
    pointExp: number,
    pointExpVerified: number
}

export type PointConfigKV = {
    [key in PointConfigType]: PointConfigV;
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
            val[item] = {
                point: POINT_DEFAULT,
                pointExp: POINT_EXT_DEFAULT,
                pointExpVerified: POINT_EXT_VERIFIED_DEFAULT
            };
            return val;
        }, {} as any);
        mapToConfig = r.reduce<PointConfigKV>((val, item) => {
            val[item.type].point = item.point;
            val[item.type].pointExp = item.pointExp;
            val[item.type].pointExpVerified = item.pointExpVerified;
            return val;
        }, mapToConfig)
        return mapToConfig;
    }
}
