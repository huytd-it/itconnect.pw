import {ApiProperty} from "@nestjs/swagger";

export class EntityDto {
    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;
}


export class DeleteParamsDto {
    @ApiProperty()
    id: number
}

export enum Approve {
    Both = 1,
    False = 2,
    True = 3
}