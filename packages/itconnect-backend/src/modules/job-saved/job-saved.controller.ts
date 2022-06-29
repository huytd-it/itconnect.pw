import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {JobSavedService} from "../../services/job-saved.service";
import {
    JobSavedCreateInputDto,
    JobSavedDeleteInputDto,
    JobSavedDto,
    JobSavedSearchInputDto
} from "../../dtos/jobSaved.dto";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";

@ApiTags('job-saved')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job-saved')
export class JobSavedController {

    constructor(
        private jobSavedService: JobSavedService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_SAVED_SEARCH)
    @ApiPaginatedResponse(JobSavedDto)
    @Get('search')
    search(
        @Query() search: JobSavedSearchInputDto,
        @Query() page: PageOptionsDto
    ) {
        return this.jobSavedService.search(search, new PageOptionsDto(page));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_SAVED_CREATE)
    @ApiOkResponse({ type: JobSavedDto })
    @Post('create')
    create(
        @Body() data: JobSavedCreateInputDto
    ) {
        return this.jobSavedService.create(data);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_SAVED_DELETE)
    @Delete(':id')
    delete(
        @Param() data: JobSavedDeleteInputDto
    ) {
        return this.jobSavedService.delete(data.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_SAVED_DELETE)
    @Delete('byJobId/:id')
    deleteJobId(
        @Param() data: JobSavedDeleteInputDto
    ) {
        return this.jobSavedService.deleteByJobId(data.id);
    }
}
