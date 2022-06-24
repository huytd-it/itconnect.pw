import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";

export class WorkFromDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}


export class WorkFromSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}