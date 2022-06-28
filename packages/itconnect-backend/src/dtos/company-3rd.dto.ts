import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";

export class Company3Rd {
    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    date: string;
}


export class Company3RdSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}