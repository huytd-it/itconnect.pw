import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional, MaxLength, MinLength} from "class-validator";
import {Approve, EntityDto} from "./abstract.dto";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";
import {Type} from "class-transformer";
import {MAX_SKILL_NAME_LENGTH, MIN_SKILL_NAME_LENGTH} from "../entities/skill.entity";

export class PositionDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    userPositionCount: number;

    @ApiProperty()
    jobPositionCount: number;

    @ApiProperty()
    isApprove: boolean;
}


export class PositionSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;

    @ApiEnumValue(
        ApiPropertyOptional,
        {
            enum: Approve,
            default: Approve.Both
        }
    )
    @Type(() => Number)
    approve: Approve = Approve.Both;

    @ApiPropertyOptional()
    @IsOptional()
    all: string;
}

export class PositionCreateDto {
    @ApiProperty()
    @MaxLength(MAX_SKILL_NAME_LENGTH)
    @MinLength(MIN_SKILL_NAME_LENGTH)
    name: string
}