import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {WorkFromDto, WorkFromSearchInputDto} from "../../dtos/workFrom.dto";
import {WorkFromService} from "../../services/workFrom.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";

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
    @Get('search')
    search(
        @Query() searchDto: WorkFromSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.workFromService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

}
