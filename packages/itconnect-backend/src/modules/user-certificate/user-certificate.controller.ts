import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {UserCertificateService} from "../../services/user-certificate.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {CreateOrEditUserCertificateDto, DeleteUserCertificateParamDto, UserCertificateDto} from "../../dtos/user-certificate.dto";
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
