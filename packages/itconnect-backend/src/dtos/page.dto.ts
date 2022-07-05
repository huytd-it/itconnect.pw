import {IsArray, IsEnum, IsInt, IsOptional, Max, Min} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {HasOrderField} from "../validators/page-has-order-field.validate";
import * as moment from "moment";

export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}


export class PageOptionsDto {
    @ApiPropertyOptional()
    @IsOptional()
    @HasOrderField()
    readonly order_field?: string;

    @ApiPropertyOptional({
        enum: Order
    })
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order;

    @ApiPropertyOptional({
        minimum: 1,
        default: 1
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    page?: number = 1;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    take?: number = 10;

    get skip(): number {
        return (Number(this.page) - 1) * Number(this.take);
    }

    constructor(data: PageOptionsDto) {
        Object.assign(this, data);
    }
}

export class PageMetaDtoParameters {
    pageOptionDto: PageOptionsDto;
    itemCount: number;
}

export class PageMetaDto {
    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly take: number;

    @ApiProperty()
    readonly itemCount: number;

    @ApiProperty()
    readonly pageCount: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor(params: PageMetaDtoParameters) {
        this.page = Number(params.pageOptionDto.page);
        this.take = Number(params.pageOptionDto.take);
        this.itemCount = params.itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}

export class PageDto<T> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[]

    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}

export enum StatisticGroupBy {
    Hour = 1,
    Day = 2,
    Month = 3,
    Year = 4,
}

export function getFormatDateGroupBy(type: StatisticGroupBy) {
    switch (type) {
        case StatisticGroupBy.Hour: return '%Hh %d-%m-%Y'
        case StatisticGroupBy.Day: return '%d-%m-%Y'
        case StatisticGroupBy.Month: return '%m-%Y'
        case StatisticGroupBy.Year: return '%Y'
    }
}

export function getFormatDateGroupByMoment(type: StatisticGroupBy) {
    switch (type) {
        case StatisticGroupBy.Hour: return 'HH[h] DD-MM-YYYY'
        case StatisticGroupBy.Day: return 'DD-MM-YYYY'
        case StatisticGroupBy.Month: return 'MM-YYYY'
        case StatisticGroupBy.Year: return 'YYYY'
    }
}

export function getAllDateInRange(type: StatisticGroupBy, start: Date, end: Date) {
    let s = moment(start);
    let e = moment(end);
    const data = [];
    const f = getFormatDateGroupByMoment(type);

    while (s <= e) {
        data.push({
            legend: s.format(f)
        })

        s = s.add(
            1,
            type === StatisticGroupBy.Hour ? 'hour' :
            type === StatisticGroupBy.Day ? 'day' :
            type === StatisticGroupBy.Month ? 'month' :
            'year'
        );
    }

    return data;
}

export function fillAllDate(data: { legend: string }[], start: Date, end: Date, group: StatisticGroupBy) {
    const hashingData = data.reduce((val, item) => {
        val[item.legend] = item;
        return val;
    }, {})
    const fill = getAllDateInRange(group, start, end);
    return fill.map(item => ({
        ...item,
        ...hashingData[item.legend]
    }))
}


export class CreateOrEditTag {
    @ApiPropertyOptional()
    id: number

    @ApiProperty()
    name: string

    @ApiPropertyOptional()
    isApprove
}

export class StatisticOption {
    @ApiPropertyOptional()
    start: Date;

    @ApiPropertyOptional()
    end: Date;

    @ApiProperty()
    group: StatisticGroupBy;

    @ApiPropertyOptional()
    jobId: number;
}