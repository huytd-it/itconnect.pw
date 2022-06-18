import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class PositionDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    /// add more field
}


export class PositionSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}