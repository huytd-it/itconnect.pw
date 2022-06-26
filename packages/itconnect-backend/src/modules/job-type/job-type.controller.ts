import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {JobTypeService} from "../../services/jobType.service";
import {JobTypeDto, JobTypeSearchInputDto} from "../../dtos/jobType.dto";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {JobTypeEntity} from "../../entities/jobType.entity";

@ApiTags('job-type')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job-type')
export class JobTypeController {

    constructor(
        private jobTypeService: JobTypeService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_TYPE_SEARCH)
    @ApiPaginatedResponse(JobTypeDto)
    @ApiPaginatedQueryOrder(JobTypeEntity)
    @Get('search')
    search(
        @Query() searchDto: JobTypeSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.jobTypeService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

}
