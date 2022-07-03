import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {UserDto} from "./user.dto";
import {JobDto} from "./job.dto";
import {StatisticGroupBy} from "./page.dto";

export class JobViewLogDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    user: UserDto;

    @ApiProperty()
    job: JobDto;

    @ApiProperty()
    createdAt: Date;
}

export class JobViewLogIdParamDto {
    @ApiProperty()
    id: number;
}

export class JobViewLogStatisticOption {
    @ApiPropertyOptional()
    start: Date;

    @ApiPropertyOptional()
    end: Date;

    @ApiProperty()
    group: StatisticGroupBy;

    @ApiPropertyOptional()
    jobId: number;
}