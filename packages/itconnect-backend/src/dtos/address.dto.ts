import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {EAddressType} from "../entities/address.entity";
import {IsEnum, IsInt, IsOptional} from "class-validator";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";

export class AddressDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({
        enum: EAddressType
    })
    @IsEnum(EAddressType)
    type: EAddressType;
}

export class AddressSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;

    @ApiEnumValue(
        ApiPropertyOptional,
        {
            enum: EAddressType
        }
    )
    @IsOptional()
    type: EAddressType;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    parentId: number;
}