import {ApiProperty} from "@nestjs/swagger";
import {PositionDto} from "./position.dto";
import {EntityDto} from "./abstract.dto";
import {IsInt, IsOptional, Max, Min} from "class-validator";
import {ExistsRowField} from "../validators/exists-row-field.validate";
import {PositionEntity} from "../entities/position.entity";
import {SkillDto} from "./skill.dto";
import {SkillEntity} from "../entities/skill.entity";

export class UserSkillDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    level: number;

    @ApiProperty()
    skill: SkillDto;
}

export class CreateOrEditUserSkillDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(10)
    level: number;

    @ApiProperty()
    @IsOptional()
    @ExistsRowField(SkillEntity, 'id', true)
    skill: number;
}

export class DeleteUserSkillParamDto {
    @ApiProperty()
    id: number;
}