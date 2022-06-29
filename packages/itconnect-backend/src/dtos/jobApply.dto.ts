import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";
import {JobDto} from "./job.dto";
import {UserDto} from "./user.dto";

export class JobApplyDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    job: JobDto;

    @ApiProperty()
    user: UserDto;
}


export class JobApplySearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    jobId: number;
}

export class JobApplyCreateInputDto {
    @ApiProperty()
    @IsInt()
    jobId: number;
}

export class JobApplyDeleteInputDto {
    @ApiProperty()
    id: number;
}