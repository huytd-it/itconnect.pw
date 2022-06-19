import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {
    ArrayMaxSize,
    ArrayMinSize, ArrayUnique,
    IsArray,
    IsDate, IsEmail, IsEnum,
    IsInt,
    IsOptional, IsString,
    Matches,
    MaxLength, MinLength,
} from "class-validator";
import {Type} from "class-transformer";
import {MAX_USER_SKILL, MIN_USER_SKILL} from "../entities/userSkill.entity";
import {MAX_POSITION_SKILL, MIN_POSITION_SKILL} from "../entities/userPosition.entity";
import {MAX_SKILL_NAME_LENGTH, MIN_SKILL_NAME_LENGTH} from "../entities/skill.entity";
import {MAX_POSITION_NAME_LENGTH, MIN_POSITION_NAME_LENGTH} from "../entities/position.entity";
import {HasRowField} from "../validators/has-row-field.validate";
import {AddressEntity} from "../entities/address.entity";

const MAX_LENGTH_FULL_NAME = 255;
const MIN_LENGTH_FULL_NAME = 3;

export class CompleteUserProfileInputDto {
    @ApiProperty()
    @MaxLength(MAX_LENGTH_FULL_NAME)
    @MinLength(MIN_LENGTH_FULL_NAME)
    fullName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Matches(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)
    phone: string;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    birthday: Date;

    @ApiProperty()
    @HasRowField(AddressEntity, 'id')
    addressProvince: number;

    @ApiProperty()
    @HasRowField(AddressEntity, 'id')
    addressDistrict: number;

    @ApiProperty()
    @HasRowField(AddressEntity, 'id')
    addressVillage: number;

    @ApiProperty()
    addressStreet: string;

    @ApiProperty()
    @Type(() => String)
    @IsArray()
    @ArrayUnique()
    @ArrayMinSize(MIN_USER_SKILL)
    @ArrayMaxSize(MAX_USER_SKILL)
    @IsString({ each: true })
    @MinLength(MIN_SKILL_NAME_LENGTH, { each: true })
    @MaxLength(MAX_SKILL_NAME_LENGTH, { each: true })
    skills: string[]

    @ApiProperty()
    @Type(() => String)
    @ArrayUnique()
    @IsArray()
    @ArrayMinSize(MIN_POSITION_SKILL)
    @ArrayMaxSize(MAX_POSITION_SKILL)
    @IsString({ each: true })
    @MinLength(MIN_POSITION_NAME_LENGTH, { each: true })
    @MaxLength(MAX_POSITION_NAME_LENGTH, { each: true })
    positions: string[]
}

export class CompleteUserProfileOutputDto {
    @ApiProperty()
    status: boolean
}

export class CompleteCompanyProfileInputDto {
    @ApiProperty()
    @MaxLength(MAX_LENGTH_FULL_NAME)
    @MinLength(MIN_LENGTH_FULL_NAME)
    companyName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Matches(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)
    phone: string;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    dayEstablish: Date;

    @ApiProperty()
    addressProvince: number;

    @ApiProperty()
    addressDistrict: number;

    @ApiProperty()
    addressVillage: number;

    @ApiProperty()
    addressStreet: string;
}

export class CompleteCompanyProfileOutputDto {
    @ApiProperty()
    status: boolean
}