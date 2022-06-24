import {ApiProperty} from "@nestjs/swagger";
import {PositionDto} from "./position.dto";
import {EntityDto} from "./abstract.dto";
import {IsInt, IsOptional, Max, Min} from "class-validator";
import {ExistsRowField} from "../validators/exists-row-field.validate";
import {PositionEntity} from "../entities/position.entity";

export class UserPositionDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    level: number;

    @ApiProperty()
    position: PositionDto;
}

export class CreateOrEditUserPositionDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(10)
    level: number;

    @ApiProperty()
    @IsOptional()
    @ExistsRowField(PositionEntity, 'id', true)
    position: number;
}

export class DeleteUserPositionParamDto {
    @ApiProperty()
    id: number;
}