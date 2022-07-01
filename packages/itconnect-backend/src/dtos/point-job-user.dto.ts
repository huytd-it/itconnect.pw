import {UserDto} from "./user.dto";
import {JobDto} from "./job.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional, MaxLength, MinLength} from "class-validator";
import {Type} from "class-transformer";

export class PointJobUserDto {
    id: number;
    user: UserDto;
    job: JobDto;
    pointTotal: number;
    pointSkill: number;
    pointPosition: number;
    pointCertificate: number;
    pointSchool: number;
    pointWorkFrom: number;
    pointLevelJob: number;
    pointLevelType: number;
    pointYoe: number;
}


export class PointJobUserSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;

    @ApiPropertyOptional()
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    jobId: number;
}
