import {EntityDto} from "./abstract.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {UserInfoDto} from "./user-info.dto";
import {CompanyInfoDto} from "./company-info.dto";
import {Exclude} from "class-transformer";
import {FileDto} from "./file.dto";
import {IsOptional} from "class-validator";
import {AppRole} from "../polices/permission.enum";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";

export class UserDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    userInfo: UserInfoDto

    @ApiProperty()
    companyInfo: CompanyInfoDto
}

export class UserGetOneParamsDto {
    @ApiProperty()
    id: number;
}

export enum UserType {
    User = 1,
    Company = 2
}

export class UserSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;

    @ApiEnumValue(
        ApiPropertyOptional,
        {
            enum: AppRole
        }
    )
    @IsOptional()
    role: AppRole;

    @ApiEnumValue(
        ApiProperty,
        {
            enum: AppRole
        }
    )
    type: UserType;
}