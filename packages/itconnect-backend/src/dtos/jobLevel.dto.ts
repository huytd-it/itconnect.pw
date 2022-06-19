import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class JobLevelDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    /// add more field
}


export class JobLevelSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}