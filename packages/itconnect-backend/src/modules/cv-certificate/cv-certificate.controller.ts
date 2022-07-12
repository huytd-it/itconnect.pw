import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {CvCertificateService} from "../../services/cv-certificate.service";
import {CreateOrEditCvCertificateDto, CvCertificateDeleteDto, CvCertificateDto} from "../../dtos/cv-certificate.dto";

@ApiTags('cv-certificate')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cv-certificate')
export class CvCertificateController {


    constructor(
        private cvCertificateService: CvCertificateService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_GET_OWNER)
    @ApiOkResponse({ type: CvCertificateDto, isArray: true })
    @Get('/getOwner')
    getOwner() {
        return this.cvCertificateService.getOwner();
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_CERTIFICATE_CE)
    @ApiOkResponse({ type: CvCertificateDto })
    @Post('/createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditCvCertificateDto
    ) {
        return this.cvCertificateService.createOrEdit(data);
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_CERTIFICATE_DELETE)
    @ApiOkResponse({ type: CvCertificateDto })
    @Delete('/:id')
    delete(
        @Param() data: CvCertificateDeleteDto
    ) {
        return this.cvCertificateService.delete(data.id);
    }


}
