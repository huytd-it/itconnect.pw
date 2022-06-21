import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";
import {EntityDto} from "./abstract.dto";

export class CertificateDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}


export class CertificateSearchInputDto {
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
}