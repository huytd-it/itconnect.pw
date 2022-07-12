import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {CvEducationService} from "../../services/cv-education.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {
    CreateOrEditCvEducationDto,
    CvEducationDeleteDto,
    CvEducationDto
} from "../../dtos/cv-education.dto";

@ApiTags('cv-education')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cv-education')
export class CvEducationController {


    constructor(
        private cvEducationService: CvEducationService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_EDUCATION_GET_OWNER)
    @ApiOkResponse({ type: CvEducationDto, isArray: true })
    @Get('/getOwner')
    getOwner() {
        return this.cvEducationService.getOwner();
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_EDUCATION_CE)
    @ApiOkResponse({ type: CvEducationDto })
    @Post('/createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditCvEducationDto
    ) {
        return this.cvEducationService.createOrEdit(data);
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_EDUCATION_DELETE)
    @ApiOkResponse({ type: CvEducationDto })
    @Delete('/:id')
    delete(
        @Param() data: CvEducationDeleteDto
    ) {
        return this.cvEducationService.delete(data.id);
    }


}
