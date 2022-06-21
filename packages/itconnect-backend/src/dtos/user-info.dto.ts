import {ApiProperty} from "@nestjs/swagger";
import {AddressDto} from "./address.dto";
import {JobLevelDto} from "./jobLevel.dto";

export class UserInfoDto {
    @ApiProperty()
    id: number;

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
    jobLevel: JobLevelDto;
}