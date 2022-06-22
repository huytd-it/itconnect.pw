import {ApiProperty} from "@nestjs/swagger";
import {EntityDto} from "./abstract.dto";
import {IsInt, IsOptional, Max, Min} from "class-validator";
import {ExistsRowField} from "../validators/exists-row-field.validate";
import {CertificateDto} from "./certificate.dto";
import {CertificateEntity} from "../entities/certificate.entity";

export class UserCertificateDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    level: number;

    @ApiProperty()
    certificate: CertificateDto;
}

export class CreateOrEditUserCertificateDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(10)
    level: number;

    @ApiProperty()
    @IsOptional()
    @ExistsRowField(CertificateEntity, 'id', true)
    certificate: number;
}

export class DeleteUserCertificateParamDto {
    @ApiProperty()
    id: number;
}

export class UserCertificateGetByCertIdParamDto {
    @ApiProperty()
    certificateId: number;
}