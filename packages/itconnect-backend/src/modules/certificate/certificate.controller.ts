import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {CertificateDto, CertificateSearchInputDto} from "../../dtos/certificate.dto";
import {CertificateEntity} from "../../entities/certificate.entity";
import {CertificateService} from "../../services/certificate.service";

@ApiTags('certificate')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('certificate')
export class CertificateController {

    constructor(
        private certificateService: CertificateService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CERTIFICATE_SEARCH)
    @ApiPaginatedResponse(CertificateDto)
    @ApiPaginatedQueryOrder(CertificateEntity)
    @Get('search')
    search(
        @Query() searchDto: CertificateSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.certificateService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

}
