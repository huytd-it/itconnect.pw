import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";
import {JobDto} from "./job.dto";
import {UserDto} from "./user.dto";
import {Type} from "class-transformer";
import {StatisticGroupBy} from "./page.dto";
import {JobApplyStatus} from "../entities/jobApply.entity";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";

export class JobApplyDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    job: JobDto;

    @ApiProperty()
    user: UserDto;

    @ApiProperty()
    status: JobApplyStatus;
}


export class JobApplySearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;

    @ApiPropertyOptional()
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    jobId: number;
}

export class JobApplyCreateInputDto {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id: number;

    @ApiEnumValue(
        ApiProperty,
        {
            enum: JobApplyStatus
        }
    )
    @IsOptional()
    status: JobApplyStatus;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    jobId: number;
}

export class JobApplyDeleteInputDto {
    @ApiProperty()
    id: number;
}

export class JobApplyStatisticOption {
    @ApiPropertyOptional()
    start: Date;

    @ApiPropertyOptional()
    end: Date;

    @ApiProperty()
    group: StatisticGroupBy;

    @ApiPropertyOptional()
    jobId: number;
}