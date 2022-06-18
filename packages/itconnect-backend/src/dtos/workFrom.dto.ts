import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class WorkFromDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    /// add more field
}


export class WorkFromSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}