import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {CertificateService} from "../../services/certificate.service";
import {CertificateDto, CertificateSearchInputDto} from "../../dtos/certificate.dto";
import {CertificateEntity} from "../../entities/certificate.entity";
import {SchoolService} from "../../services/school.service";
import {SchoolDto, SchoolSearchInputDto} from "../../dtos/school.dto";
import {SchoolEntity} from "../../entities/school.entity";

@ApiTags('school')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('school')
export class SchoolController {

    constructor(
        private schoolService: SchoolService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.SCHOOL_SEARCH)
    @ApiPaginatedResponse(SchoolDto)
    @ApiPaginatedQueryOrder(SchoolEntity)
    @Get('search')
    search(
        @Query() searchDto: SchoolSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.schoolService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

}
