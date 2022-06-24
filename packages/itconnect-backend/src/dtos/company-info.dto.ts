import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional, MaxLength, MinLength} from "class-validator";
import {Approve, EntityDto} from "./abstract.dto";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";
import {Type} from "class-transformer";
import {MAX_COMPANY_TAG_NAME_LENGTH, MIN_COMPANY_TAG_NAME_LENGTH} from "../entities/companyTag.entity";

export class CompanyInfoDto extends EntityDto {
    // need update
}