import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {CompanyTagService} from "../../services/company-tag.service";
import {CompanyTagDto, CompanyTagSearchInputDto} from "../../dtos/company-tag.dto";
import {CompanyTagEntity} from "../../entities/companyTag.entity";

@ApiTags('company-tag')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company-tag')
export class CompanyTagController {

    constructor(
        private companyTagService: CompanyTagService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.COMPANY_TAG_SEARCH)
    @ApiPaginatedResponse(CompanyTagDto)
    @ApiPaginatedQueryOrder(CompanyTagEntity)
    @Get('search')
    search(
        @Query() searchDto: CompanyTagSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.companyTagService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.COMPANY_TAG_SEARCH)
    @Post('create-tag')
    create(
        @Body() data: CompanyTagDto,
    ) {
        return this.companyTagService.create(data);
    }
}
