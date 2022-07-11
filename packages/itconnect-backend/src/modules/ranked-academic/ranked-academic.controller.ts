import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {CreateOrEditTag, PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {RankedAcademicService} from "../../services/rankedAcademic.service";
import {RankedAcademicDto, RankedAcademicSearchInputDto} from "../../dtos/rankedAcademic.dto";
import {JobLevelDto} from "../../dtos/jobLevel.dto";

@ApiTags('ranked-academic')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ranked-academic')
export class RankedAcademicController {

    constructor(
        private rankedAcademicService: RankedAcademicService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.WORK_FROM_SEARCH)
    @ApiPaginatedResponse(RankedAcademicDto)
    @Get('search')
    search(
        @Query() searchDto: RankedAcademicSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.rankedAcademicService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CREATE_OR_EDIT_TAG)
    @ApiOkResponse({ type: JobLevelDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditTag,
    ) {
        return this.rankedAcademicService.createOrEdit(data);
    }
}
