import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {UserSkillService} from "../../services/user-skill.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {CreateOrEditUserSkillDto, DeleteUserSkillParamDto, UserSkillDto} from "../../dtos/user-skill.dto";
import {AppPermission} from "../../polices/permission.enum";
import {CvWorkExperienceSkillService} from "../../services/cv-work-experience-skill.service";
import {
    CreateOrEditCvWorkExperienceSkillDto, DeleteCvWorkExperienceSkillParamDto,
    GetAllCvWorkExperienceParamDto
} from "../../dtos/cv-work-experience-skill.dto";
import {CvWorkExperienceSkillDto} from "../../dtos/cv-work-experience.dto";

@ApiTags('cv-work-experience-skill')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cv-work-experience-skill')
export class CvWorkExperienceSkillController {

    constructor(
        private cvWorkExperienceSkillService: CvWorkExperienceSkillService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_SKILL_CE)
    @ApiOkResponse({ type: CvWorkExperienceSkillDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() dto: CreateOrEditCvWorkExperienceSkillDto
    ) {
        return this.cvWorkExperienceSkillService.createOrEdit(dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_SKILL_DELETE)
    @Delete(':id')
    delete(
        @Param() dto: DeleteCvWorkExperienceSkillParamDto
    ) {
        return this.cvWorkExperienceSkillService.delete(dto.id);
    }
}
