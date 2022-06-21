import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";

export class JobLevelDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}


export class JobLevelSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}