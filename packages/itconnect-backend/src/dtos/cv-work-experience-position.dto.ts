import {ApiProperty} from "@nestjs/swagger";
import {EntityDto} from "./abstract.dto";
import {IsInt, IsOptional, Max, Min} from "class-validator";
import {PositionDto} from "./position.dto";

export class CvWorkExperienceDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    position: PositionDto;

    @ApiProperty()
    cvWorkExperience: number;
}

export class CreateOrEditCvWorkExperiencePositionDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsOptional()
    position: number;

    @ApiProperty()
    @IsOptional()
    cvWorkExperience: number;
}

export class DeleteCvWorkExperiencePositionParamDto {
    @ApiProperty()
    id: number;
}

export class GetAllCvWorkExperienceParamDto {
    @ApiProperty()
    cvWorkExperienceId: number;
}