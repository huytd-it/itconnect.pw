import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {
    ArrayMaxSize,
    IsArray, IsBoolean, IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinDate,
    MinLength,
    ValidateNested
} from "class-validator";
import {AddressEntity} from "../entities/address.entity";
import {ExistsRowField} from "../validators/exists-row-field.validate";

export class PeopleSearchQueryInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}

export class PeopleSearchLevelRangeInputDto {
    @ApiProperty()
    @MinLength(1)
    @MaxLength(255)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    levelMin: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    levelMax: number;
}

export class PeopleSearchBodyInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    yoe: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    jobLevel: number[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @IsString({ each: true })
    @MinLength(1, { each: true })
    @MaxLength(255, { each: true })
    school: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @IsString({ each: true })
    @MinLength(1, { each: true })
    @MaxLength(255, { each: true })
    company: string[];

    @ApiPropertyOptional({
        type: PeopleSearchLevelRangeInputDto,
        isArray: true
    })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    certificate: PeopleSearchLevelRangeInputDto[];

    @ApiPropertyOptional({
        type: PeopleSearchLevelRangeInputDto,
        isArray: true
    })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    skill: PeopleSearchLevelRangeInputDto[];

    @ApiPropertyOptional({
        type: PeopleSearchLevelRangeInputDto,
        isArray: true
    })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    position: PeopleSearchLevelRangeInputDto[];

    @ApiPropertyOptional()
    @IsOptional()
    includeSelf: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @ExistsRowField(AddressEntity, 'id', true)
    addressProvince: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @ExistsRowField(AddressEntity, 'id', true)
    addressDistrict: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @ExistsRowField(AddressEntity, 'id', true)
    addressVillage: number;
}