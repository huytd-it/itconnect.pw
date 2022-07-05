import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {CreateOrEditTag, PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {CertificateCreateDto, CertificateDto, CertificateSearchInputDto} from "../../dtos/certificate.dto";
import {CertificateEntity} from "../../entities/certificate.entity";
import {CertificateService} from "../../services/certificate.service";
import {SkillCreateDto} from "../../dtos/skill.dto";
import {PositionDto} from "../../dtos/position.dto";

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
    @Get('search')
    search(
        @Query() searchDto: CertificateSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.certificateService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CERTIFICATE_CREATE_TAG)
    @Post('create-tag')
    createTag(
        @Body() data: CertificateCreateDto,
    ) {
        return this.certificateService.create(data);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CREATE_OR_EDIT_TAG)
    @ApiOkResponse({ type: PositionDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditTag,
    ) {
        return this.certificateService.createOrEdit(data);
    }
}
