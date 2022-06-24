import {EntityDto} from "./abstract.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsIn, IsInt, IsOptional, MaxLength} from "class-validator";
import {ExistsRowField} from "../validators/exists-row-field.validate";
import {MAX_WORK_EXPERIENCE_LENGTH} from "../entities/cvWorkExperience.entity";
import {CertificateDto} from "./certificate.dto";
import {CertificateEntity} from "../entities/certificate.entity";
import {MAX_CERTIFICATE_CONTENT_LENGTH} from "../entities/cvCertificate.entity";

export class CvCertificateDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    year: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    certificate: CertificateDto;
}

export class CreateOrEditCvCertificateDto {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id: number;

    @ApiProperty()
    @IsInt()
    year: number;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(MAX_CERTIFICATE_CONTENT_LENGTH)
    content: string;

    @ApiProperty()
    @IsInt()
    @ExistsRowField(CertificateEntity, 'id')
    certificate: number;
}

export class CvCertificateDeleteDto {
    @ApiProperty()
    id: number
}