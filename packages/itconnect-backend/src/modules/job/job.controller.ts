import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {
    JobCreateOrEditDto,
    JobCreateOrEditQueryDto,
    JobDto,
    JobIdParamDto, JobSearchBodyInputDto,
    JobSearchQueryInputDto
} from "../../dtos/job.dto";
import {JobService} from "../../services/job.service";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {JobLevelDto, JobLevelSearchInputDto} from "../../dtos/jobLevel.dto";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {JobLevelEntity} from "../../entities/jobLevel.entity";
import {PageOptionsDto} from "../../dtos/page.dto";
import {JobEntity} from "../../entities/job.entity";

@ApiTags('job')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job')
export class JobController {

    constructor(
        private jobService: JobService
    ) {
    }

    // every one can use
    // if not author only get publish data
    // no permission
    @ApiOkResponse({ type: JobDto })
    @Get('/:id')
    getById(
        @Param() dto: JobIdParamDto
    ){
        return this.jobService.getById(dto.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_CE)
    @ApiOkResponse({ type: JobDto })
    @Post('/createOrEdit')
    createOrEdit(
        @Body() data: JobCreateOrEditDto,
        @Query() query: JobCreateOrEditQueryDto
    ) {
        return this.jobService.createOrEdit(data, query.hasResponseEntity, query.saveDraft);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_DELETE)
    @Delete('/:id')
    delete(
        @Body() dto: JobIdParamDto
    ) {
        return this.jobService.delete(dto.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_SEARCH)
    @ApiPaginatedResponse(JobDto)
    @ApiPaginatedQueryOrder(JobEntity)
    @Post('search')
    search(
        @Query() searchQuery: JobSearchQueryInputDto,
        @Body() searchBody: JobSearchBodyInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.jobService.search(searchQuery, searchBody, new PageOptionsDto(pageOptionsDto));
    }

}
