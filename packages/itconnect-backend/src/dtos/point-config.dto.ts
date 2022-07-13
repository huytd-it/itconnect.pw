import {ApiProperty} from "@nestjs/swagger";
import {PointConfigType} from "../entities/pointConfig.entity";

export class PointConfigDto {
    @ApiProperty()
    type: PointConfigType;

    @ApiProperty()
    point: number;

    @ApiProperty()
    pointExp: number;

    @ApiProperty()
    pointExpVerified: number;
}

export class PointConfigGetParamsDto {
    @ApiProperty()
    type: PointConfigType;
}