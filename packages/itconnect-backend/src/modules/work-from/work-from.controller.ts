import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {CreateOrEditTag, PageOptionsDto} from "../../dtos/page.dto";
import {WorkFromDto, WorkFromSearchInputDto} from "../../dtos/workFrom.dto";
import {WorkFromService} from "../../services/workFrom.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {AddressEntity} from "../../entities/address.entity";
import {WorkFromEntity} from "../../entities/workFrom.entity";
import {PositionDto} from "../../dtos/position.dto";

@ApiTags('work-from')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('work-from')
export class WorkFromController {

    constructor(
        private workFromService: WorkFromService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.WORK_FROM_SEARCH)
    @ApiPaginatedResponse(WorkFromDto)
    @ApiPaginatedQueryOrder(WorkFromEntity)
    @Get('search')
    search(
        @Query() searchDto: WorkFromSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.workFromService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CREATE_OR_EDIT_TAG)
    @ApiOkResponse({ type: WorkFromDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditTag,
    ) {
        return this.workFromService.createOrEdit(data);
    }
}
