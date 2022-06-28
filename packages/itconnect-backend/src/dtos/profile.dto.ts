import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {
    IsDate, IsEmail, IsEmpty, IsEnum,
    IsInt, IsNotEmpty,
    IsOptional, IsString,
    Matches,
    MaxLength, MinLength,
} from "class-validator";
import {Type} from "class-transformer";
import {ExistsRowField} from "../validators/exists-row-field.validate";
import {AddressEntity} from "../entities/address.entity";
import {UserDto} from "./user.dto";
import {JobLevelEntity} from "../entities/jobLevel.entity";
import {MAX_USER_INFO_INTEREST_LENGTH, MAX_USER_INFO_OBJECTIVE_LENGTH} from "../entities/userInfo.entity";

const MAX_LENGTH_FULL_NAME = 255;
const MIN_LENGTH_FULL_NAME = 3;

export class CreateOrEditUserProfileInputDto {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    @MaxLength(MAX_LENGTH_FULL_NAME)
    @MinLength(MIN_LENGTH_FULL_NAME)
    fullName: string;

    @ApiProperty()
    @Matches(/^$|([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)
    phone: string;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    birthday: Date;

    @ApiProperty()
    @ExistsRowField(AddressEntity, 'id')
    addressProvince: number;

    @ApiProperty()
    @ExistsRowField(AddressEntity, 'id')
    addressDistrict: number;

    @ApiProperty()
    @ExistsRowField(AddressEntity, 'id')
    addressVillage: number;

    @ApiProperty()
    addressStreet: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(MAX_USER_INFO_INTEREST_LENGTH)
    interest: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(MAX_USER_INFO_OBJECTIVE_LENGTH)
    objective: string;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(JobLevelEntity, 'id')
    jobLevel: number;
}

export class CreateOrUserProfileOutputDto {
    @ApiProperty()
    status: boolean
}

export class CreateOrEditCompanyProfileInputDto {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    companyMst: string;

    @ApiProperty()
    @Matches(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)
    phone: string;
}

export class CreateOrEditCompanyProfileOutputDto {
    @ApiProperty()
    status: boolean
}

export class DataBoostrapOutputDto {
    @ApiProperty()
    permissions: string[];

    @ApiProperty()
    user: UserDto;
}

