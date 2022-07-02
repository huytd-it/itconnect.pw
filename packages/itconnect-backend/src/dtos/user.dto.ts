import {EntityDto} from "./abstract.dto";
import {ApiProperty} from "@nestjs/swagger";
import {UserInfoDto} from "./user-info.dto";
import {CompanyInfoDto} from "./company-info.dto";
import {Exclude} from "class-transformer";
import {FileDto} from "./file.dto";

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