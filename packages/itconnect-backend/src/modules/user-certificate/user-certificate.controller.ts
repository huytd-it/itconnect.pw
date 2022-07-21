import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {UserCertificateService} from "../../services/user-certificate.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {
    CreateOrEditUserCertificateDto,
    DeleteUserCertificateParamDto,
    UserCertificateDto,
    UserCertificateGetByCertIdParamDto, UserCertificateGetByCertUIdParamDto
} from "../../dtos/user-certificate.dto";
import {AppPermission} from "../../polices/permission.enum";

@ApiTags('user-certificate')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-certificate')
export class UserCertificateController {

    constructor(
        private userCertificateService: UserCertificateService
    ) {
    }

    // getByCertificateId

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_CERTIFICATE_GET_BY_CERT_ID)
    @ApiOkResponse({ type: UserCertificateDto })
    @Get('getByCertificateId/:certificateId')
    getByCertificateId(
        @Param() dto: UserCertificateGetByCertIdParamDto
    ) {
        return this.userCertificateService.getByCertificateId(dto.certificateId);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_CERTIFICATE_GET_BY_CERT_ID)
    @ApiOkResponse({ type: UserCertificateDto })
    @Get('getByCertificateUId/:certificateId/:userId')
    getByCertificateUId(
        @Param() dto: UserCertificateGetByCertUIdParamDto
    ) {
        return this.userCertificateService.getByCertificateUId(dto.certificateId, dto.userId);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_CERTIFICATE_GET_ALL)
    @ApiOkResponse({ type: UserCertificateDto })
    @Get('getAll')
    getAll() {
        return this.userCertificateService.getAll();
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_CERTIFICATE_CE)
    @ApiOkResponse({ type: UserCertificateDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() dto: CreateOrEditUserCertificateDto
    ) {
        return this.userCertificateService.createOrEdit(dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_CERTIFICATE_DELETE)
    @Delete(':id')
    delete(
        @Param() dto: DeleteUserCertificateParamDto
    ) {
        return this.userCertificateService.delete(dto.id);
    }
}
