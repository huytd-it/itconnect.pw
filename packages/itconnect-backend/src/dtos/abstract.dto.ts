import {ApiProperty} from "@nestjs/swagger";

export class EntityDto {
    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;
}