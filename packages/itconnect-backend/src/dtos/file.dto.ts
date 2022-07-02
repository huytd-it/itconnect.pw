import {ApiProperty} from "@nestjs/swagger";
import {BaseEntity} from "typeorm";


export class FileDto extends BaseEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    mime: string;

    @ApiProperty()
    size: number;
}

export class FileViewDto {
    @ApiProperty()
    slug: string;
}