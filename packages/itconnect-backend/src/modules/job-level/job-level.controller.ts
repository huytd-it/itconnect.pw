import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {CreateOrEditTag, PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {JobLevelService} from "../../services/jobLevel.service";
import {JobLevelDto, JobLevelSearchInputDto} from "../../dtos/jobLevel.dto";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {AddressEntity} from "../../entities/address.entity";
import {JobLevelEntity} from "../../entities/jobLevel.entity";
import {WorkFromDto} from "../../dtos/workFrom.dto";

@ApiTags('job-level')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job-level')
export class JobLevelController {

    constructor(
        private jobLevelService: JobLevelService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_LEVEL_SEARCH)
    @ApiPaginatedResponse(JobLevelDto)
    @ApiPaginatedQueryOrder(JobLevelEntity)
    @Get('search')
    search(
        @Query() searchDto: JobLevelSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.jobLevelService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CREATE_OR_EDIT_TAG)
    @ApiOkResponse({ type: JobLevelDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditTag,
    ) {
        return this.jobLevelService.createOrEdit(data);
    }
}
