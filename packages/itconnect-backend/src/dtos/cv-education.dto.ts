import {EntityDto} from "./abstract.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsIn, IsInt, IsOptional, MaxLength} from "class-validator";
import {ExistsRowField} from "../validators/exists-row-field.validate";
import {RankedAcademicDto} from "./rankedAcademic.dto";
import {SchoolEntity} from "../entities/school.entity";
import {MAX_EDUCATION_CONTENT_LENGTH} from "../entities/cvEducation.entity";
import {RankedAcademicEntity} from "../entities/rankedAcademic.entity";

export class CvEducationDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    content: string;

    @ApiProperty()
    mark: string;

    @ApiProperty()
    rankedAcademic: RankedAcademicDto;

    @ApiProperty()
    school: SchoolEntity;
}

export class CreateOrEditCvEducationDto {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id: number;

    @ApiProperty()
    startDate: Date;

    @ApiPropertyOptional()
    @IsOptional()
    endDate: Date;

    @ApiPropertyOptional()
    @IsOptional()
    mark: number;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(MAX_EDUCATION_CONTENT_LENGTH)
    content: string;

    @ApiProperty()
    @IsInt()
    @ExistsRowField(SchoolEntity, 'id')
    school: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @ExistsRowField(RankedAcademicEntity, 'id', true)
    rankedAcademic: number;
}

export class CvEducationDeleteDto {
    @ApiProperty()
    id: number
}