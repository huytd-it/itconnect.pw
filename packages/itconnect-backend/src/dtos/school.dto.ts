import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional, MaxLength, MinLength} from "class-validator";
import {Approve, EntityDto} from "./abstract.dto";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";
import {Type} from "class-transformer";
import {MAX_SCHOOL_NAME_LENGTH, MIN_SCHOOL_NAME_LENGTH} from "../entities/school.entity";

export class SchoolDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isApprove: boolean;
}


export class SchoolSearchInputDto {
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

export class SchoolCreateDto {
    @ApiProperty()
    @MaxLength(MAX_SCHOOL_NAME_LENGTH)
    @MinLength(MIN_SCHOOL_NAME_LENGTH)
    name: string
}