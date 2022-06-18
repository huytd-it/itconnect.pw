import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class SkillDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    /// add more field
}


export class SkillSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}