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
import {PositionDto} from "./position.dto";
import {SkillDto} from "./skill.dto";
import {SchoolDto} from "./school.dto";
import {CertificateDto} from "./certificate.dto";
import {WorkFromDto} from "./workFrom.dto";
import {EntityDto} from "./abstract.dto";
import {AddressEntity} from "../entities/address.entity";
import {JobStatus} from "../entities/job.entity";
import {AddressDto} from "./address.dto";
import {CompanyTagDto} from "./company-tag.dto";
import {ExistsRowField} from "../validators/exists-row-field.validate";
import {PositionEntity} from "../entities/position.entity";
import {SkillEntity} from "../entities/skill.entity";
import {CertificateEntity} from "../entities/certificate.entity";
import {SchoolEntity} from "../entities/school.entity";
import {WorkFromEntity} from "../entities/workFrom.entity";
import {JobLevelEntity} from "../entities/jobLevel.entity";
import {CompanyTagEntity} from "../entities/companyTag.entity";
import {UserDto} from "./user.dto";
import {Transform, Type} from "class-transformer";
import {ApiEnumValue} from "../utils/decorators/api-enum-value.decorator";
import {JobTypeEntity} from "../entities/jobType.entity";

export class JobRangePropCreateOrEdit {
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(10)
    levelMax: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(10)
    levelMin: number;
}

export class JobRangeProp extends EntityDto {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    levelMax: number;

    @ApiProperty()
    levelMin: number;
}

export class JobPositionDto extends JobRangeProp {
    @ApiProperty()
    position: PositionDto
}

export class JobPositionCreateOrEditDto extends JobRangePropCreateOrEdit {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(PositionEntity, 'id', true)
    position: number;
}

export class JobSkillDto extends JobRangeProp {
    @ApiProperty()
    skill: SkillDto
}

export class JobSkillCreateOrEditDto extends JobRangePropCreateOrEdit {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(SkillEntity, 'id', true)
    skill: number;
}

export class JobCertificateDto extends JobRangeProp {
    @ApiProperty()
    certificate: CertificateDto;
}

export class JobCertificateCreateOrEditDto extends JobRangePropCreateOrEdit {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(CertificateEntity, 'id', true)
    certificate: number;
}

export class JobSchoolDto extends EntityDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    school: SchoolDto
}

export class JobSchoolCreateOrEditDto extends JobRangePropCreateOrEdit {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(SchoolEntity, 'id', true)
    school: number;
}

export class JobWorkFromDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    workFrom: WorkFromDto;
}

export class JobWorkFromCreateOrEditDto extends JobRangePropCreateOrEdit {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(WorkFromEntity, 'id', true)
    workFrom: number;
}

export class JobJobLevelDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    workFrom: WorkFromDto;
}

export class JobJobLevelCreateOrEditDto extends JobRangePropCreateOrEdit {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    @ExistsRowField(JobLevelEntity, 'id', true)
    jobLevel: number;
}

export class JobDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    addressProvince: AddressDto;

    @ApiProperty()
    addressDistrict: AddressDto;

    @ApiProperty()
    addressVillage: AddressDto;

    @ApiProperty()
    addressStreet: string;

    @ApiProperty({ type: JobPositionDto, isArray: true })
    jobPositions: JobPositionDto[];

    @ApiProperty({ type: JobSkillDto, isArray: true })
    jobSkills: JobSkillDto[];

    @ApiProperty({ type: JobCertificateDto, isArray: true })
    jobCertificates: JobCertificateDto[];

    @ApiProperty({ type: JobSchoolDto, isArray: true })
    jobSchools: JobSchoolDto[];

    @ApiProperty({ type: JobWorkFromDto, isArray: true })
    jobWorkFrom: JobWorkFromDto[];

    @ApiProperty({ type: JobJobLevelDto, isArray: true })
    jobJobLevels: JobJobLevelDto[];

    @ApiProperty()
    companyTag: CompanyTagDto;

    @ApiProperty()
    salaryMin: number;

    @ApiProperty()
    salaryMax: number;

    @ApiProperty()
    yoe: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    descriptionContent: string;

    @ApiProperty()
    requirementContent: string;

    @ApiProperty()
    reasonContent: string;

    @ApiProperty()
    status: JobStatus;

    @ApiProperty()
    user: UserDto;

    @ApiProperty()
    jobApplyCount: number;

    @ApiProperty()
    jobApplySelf: number;

    @ApiProperty()
    jobSavedSelf: number;
}

export class JobIdParamDto {
    @ApiProperty()
    id: number;
}

export class JobCreateOrEditDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    id: number;

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

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    addressStreet: string;

    @ApiPropertyOptional({ type: JobPositionCreateOrEditDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    jobPositions: JobPositionCreateOrEditDto[];

    @ApiPropertyOptional({ type: JobSkillCreateOrEditDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    jobSkills: JobSkillCreateOrEditDto[];

    @ApiPropertyOptional({ type: JobCertificateCreateOrEditDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    jobCertificates: JobCertificateCreateOrEditDto[];

    @ApiPropertyOptional({ type: JobSchoolCreateOrEditDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    jobSchools: JobSchoolCreateOrEditDto[];

    @ApiPropertyOptional({ type: JobWorkFromCreateOrEditDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    jobWorkFrom: JobWorkFromCreateOrEditDto[];

    @ApiPropertyOptional({ type: JobJobLevelCreateOrEditDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    jobJobLevels: JobJobLevelCreateOrEditDto[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @ExistsRowField(CompanyTagEntity, 'id', true)
    companyTag: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @ExistsRowField(JobTypeEntity, 'id', true)
    jobType: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Max(9999999999)
    salaryMin: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Max(9999999999)
    salaryMax: number;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(255)
    name: string;

    @ApiProperty()
    @Type(() => Date)
    @MinDate(new Date())
    endDate: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    yoe: number;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(65000)
    descriptionContent: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(65000)
    requirementContent: string;

    @ApiPropertyOptional()
    @IsOptional()
    reasonContent: string;
}

export class JobCreateOrEditQueryDto {
    @ApiPropertyOptional()
    @IsOptional()
    hasResponseEntity: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    saveDraft: boolean;
}

export class JobSearchQueryInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}

export class JobSearchLevelRangeInputDto {
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

export class JobSearchBodyInputDto {
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
    @IsInt({ each: true })
    jobType: number[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    workFrom: number[];

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
        type: JobSearchLevelRangeInputDto,
        isArray: true
    })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    certificate: JobSearchLevelRangeInputDto[];

    @ApiPropertyOptional({
        type: JobSearchLevelRangeInputDto,
        isArray: true
    })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    skill: JobSearchLevelRangeInputDto[];

    @ApiPropertyOptional({
        type: JobSearchLevelRangeInputDto,
        isArray: true
    })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    position: JobSearchLevelRangeInputDto[];

    @ApiEnumValue(
        ApiPropertyOptional,
        {
            enum: JobStatus
        }
    )
    @IsOptional()
    @IsEnum(JobStatus)
    status: JobStatus;

    @ApiPropertyOptional()
    @IsOptional()
    includeJobExpired: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    salaryMin: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    salaryMax: number;

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