import {ApiProperty} from "@nestjs/swagger";
import {AddressDto} from "./address.dto";
import {JobLevelDto} from "./jobLevel.dto";
import {Column} from "typeorm";
import {FileDto} from "./file.dto";

export class UserInfoDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    avatar: FileDto;

    @ApiProperty()
    banner: FileDto;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    addressProvince: AddressDto;

    @ApiProperty()
    addressDistrict: AddressDto;

    @ApiProperty()
    addressVillage: AddressDto;

    @ApiProperty()
    addressStreet: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    birthday: Date;

    @ApiProperty()
    interest: string;

    @ApiProperty()
    objective: string;

    @ApiProperty()
    computeYoe: number;

    @ApiProperty()
    computeYoeDate: Date;

    @ApiProperty()
    computeYoeCurrent: boolean;

    @ApiProperty()
    jobLevel: JobLevelDto;
}

export class UserInfoComputeYoe {
    @ApiProperty()
    computeYoe: number;

    @ApiProperty()
    computeYoeDate: Date;

    @ApiProperty()
    computeYoeCurrent: boolean;
}