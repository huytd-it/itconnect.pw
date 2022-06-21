import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AddressEntity, EAddressType} from "../entities/address.entity";
import {IsEnum, IsInt, IsOptional} from "class-validator";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";
import {Type} from "class-transformer";
import {EntityDto} from "./abstract.dto";

export class AddressDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({
        enum: EAddressType
    })
    @IsEnum(EAddressType)
    type: EAddressType;

    @ApiProperty()
    parentId: number;
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
    @Type(() => Number)
    @IsOptional()
    type: EAddressType;

    @ApiPropertyOptional()
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    parentId: number;
}