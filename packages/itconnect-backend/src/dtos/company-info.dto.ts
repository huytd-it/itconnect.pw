import {EntityDto} from "./abstract.dto";
import {ApiProperty} from "@nestjs/swagger";
import {AddressDto} from "./address.dto";
import {CompanyTagDto} from "./company-tag.dto";

export class CompanyInfoDto extends EntityDto {
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
    companyTagId: number;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    mst: string;

    @ApiProperty()
    companyName: string;

    @ApiProperty()
    dayEstablish: Date;
}