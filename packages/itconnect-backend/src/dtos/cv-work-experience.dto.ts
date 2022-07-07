import {CompanyTagDto} from "./company-tag.dto";
import {JobLevelDto} from "./jobLevel.dto";
import {WorkFromDto} from "./workFrom.dto";
import {EntityDto} from "./abstract.dto";
import {SkillDto} from "./skill.dto";
import {PositionDto} from "./position.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsIn, IsInt, IsOptional, MaxLength} from "class-validator";
import {ExistsRowField} from "../validators/exists-row-field.validate";
import {CompanyTagEntity} from "../entities/companyTag.entity";
import {JobLevelEntity} from "../entities/jobLevel.entity";
import {CvWorkExperienceStatus, MAX_WORK_EXPERIENCE_LENGTH} from "../entities/cvWorkExperience.entity";
import {JobTypeEntity} from "../entities/jobType.entity";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";

export class CvWorkExperiencePositionDto extends EntityDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    position: PositionDto;
}

export class CvWorkExperienceSkillDto extends EntityDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    skill: SkillDto;
}

export class CvWorkExperienceDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    content: string;

    @ApiProperty()
    status: CvWorkExperienceStatus;

    @ApiProperty()
    companyTag: CompanyTagDto;

    @ApiProperty()
    jobLevel: JobLevelDto;

    @ApiProperty()
    workFrom: WorkFromDto;

    @ApiProperty({ type: CvWorkExperienceSkillDto, isArray: true })
    cvWorkExperienceSkills: CvWorkExperienceSkillDto[];

    @ApiProperty({ type: CvWorkExperiencePositionDto, isArray: true })
    cvWorkExperiencePositions: CvWorkExperiencePositionDto[];
}

export class CreateOrEditCvWorkExperienceDto {
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
    @MaxLength(MAX_WORK_EXPERIENCE_LENGTH)
    content: string;

    @ApiProperty()
    @IsInt()
    @ExistsRowField(CompanyTagEntity, 'id')
    companyTag: number;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(JobLevelEntity, 'id', true)
    jobLevel: number;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(JobTypeEntity, 'id', true)
    jobType: number;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(JobLevelEntity, 'id', true)
    workFrom: number;

    @ApiPropertyOptional()
    @IsOptional()
    force: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    status: CvWorkExperienceStatus;
}

export class CvWorkExperienceDeleteDto {
    @ApiProperty()
    id: number
}