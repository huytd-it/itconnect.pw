import {ApiProperty} from "@nestjs/swagger";
import {EntityDto} from "./abstract.dto";
import {IsInt, IsOptional, Max, Min} from "class-validator";
import {SkillDto} from "./skill.dto";
import {UserTaggedSkillEntity} from "../entities/userTaggedSkill.entity";
import {CvWorkExperienceEntity} from "../entities/cvWorkExperience.entity";

export class CvWorkExperienceDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    skill: SkillDto;

    @ApiProperty()
    cvWorkExperience: number;
}

export class CreateOrEditCvWorkExperienceSkillDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsOptional()
    skill: number;

    @ApiProperty()
    @IsOptional()
    cvWorkExperience: number;
}

export class DeleteCvWorkExperienceSkillParamDto {
    @ApiProperty()
    id: number;
}

export class GetAllCvWorkExperienceParamDto {
    @ApiProperty()
    cvWorkExperienceId: number;
}