import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
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
        return this.jobService.createOrEdit(
            data,
            (<any>query.hasResponseEntity == 'true'),
            (<any>query.saveDraft == 'true')
        );
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_DELETE)
    @Delete('/:id')
    delete(
        @Param() dto: JobIdParamDto
    ) {
        return this.jobService.delete(dto.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_CE)
    @Put('publish/:id')
    publish(
        @Param() dto: JobIdParamDto
    ) {
        return this.jobService.publish(dto.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_APPROVE)
    @Put('approve/:id')
    approve(
        @Param() dto: JobIdParamDto
    ) {
        return this.jobService.approve(dto.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_CE)
    @Put('stop/:id')
    stop(
        @Param() dto: JobIdParamDto
    ) {
        return this.jobService.stop(dto.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_SEARCH)
    @ApiPaginatedResponse(JobDto)
    @Post('search')
    search(
        @Query() searchQuery: JobSearchQueryInputDto,
        @Body() searchBody: JobSearchBodyInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.jobService.search(searchQuery, searchBody, new PageOptionsDto(pageOptionsDto));
    }

}
