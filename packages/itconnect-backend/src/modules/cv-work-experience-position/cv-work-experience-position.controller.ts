import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {
    CreateOrEditCvWorkExperiencePositionDto, DeleteCvWorkExperiencePositionParamDto,
} from "../../dtos/cv-work-experience-position.dto";
import {CvWorkExperiencePositionDto} from "../../dtos/cv-work-experience.dto";
import {CvWorkExperiencePositionService} from "../../services/cv-work-experience-position.service";

@ApiTags('cv-work-experience-position')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cv-work-experience-position')
export class CvWorkExperiencePositionController {

    constructor(
        private cvWorkExperiencePositionService: CvWorkExperiencePositionService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_POSITION_CE)
    @ApiOkResponse({ type: CvWorkExperiencePositionDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() dto: CreateOrEditCvWorkExperiencePositionDto
    ) {
        return this.cvWorkExperiencePositionService.createOrEdit(dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_POSITION_DELETE)
    @Delete(':id')
    delete(
        @Param() dto: DeleteCvWorkExperiencePositionParamDto
    ) {
        return this.cvWorkExperiencePositionService.delete(dto.id);
    }
}
