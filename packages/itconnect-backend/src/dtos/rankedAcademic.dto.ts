import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";

export class RankedAcademicDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}


export class RankedAcademicSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}