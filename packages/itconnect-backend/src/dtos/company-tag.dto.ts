import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional, MaxLength, MinLength} from "class-validator";
import {Approve, EntityDto} from "./abstract.dto";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";
import {Type} from "class-transformer";
import {MAX_COMPANY_TAG_NAME_LENGTH, MIN_COMPANY_TAG_NAME_LENGTH} from "../entities/companyTag.entity";

export class CompanyTagDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isApprove: boolean;
}


export class CompanyTagSearchInputDto {
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

export class CompanyTagCreateDto {
    @ApiProperty()
    @MaxLength(MAX_COMPANY_TAG_NAME_LENGTH)
    @MinLength(MIN_COMPANY_TAG_NAME_LENGTH)
    name: string
}