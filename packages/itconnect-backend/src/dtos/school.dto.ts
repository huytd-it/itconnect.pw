import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";

export class SchoolDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}


export class SchoolSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}