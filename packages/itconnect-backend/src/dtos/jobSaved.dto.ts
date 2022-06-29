import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";
import {JobDto} from "./job.dto";
import {UserDto} from "./user.dto";

export class JobSavedDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    job: JobDto;

    @ApiProperty()
    user: UserDto;
}


export class JobSavedSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}

export class JobSavedCreateInputDto {
    @ApiProperty()
    @IsInt()
    jobId: number;
}

export class JobSavedDeleteInputDto {
    @ApiProperty()
    id: number;
}