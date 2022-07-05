import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsEnum, IsOptional, MaxLength, MinLength} from "class-validator";
import {Approve, EntityDto} from "./abstract.dto";
import {MAX_SKILL_NAME_LENGTH, MIN_SKILL_NAME_LENGTH} from "../entities/skill.entity";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";
import {Type} from "class-transformer";

export class SkillDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    userSkillCount: number;

    @ApiProperty()
    jobSkillCount: number;

    @ApiProperty()
    isApprove: boolean;
}


export class SkillSearchInputDto {
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
}

export class SkillCreateDto {
    @ApiProperty()
    @MaxLength(MAX_SKILL_NAME_LENGTH)
    @MinLength(MIN_SKILL_NAME_LENGTH)
    name: string
}