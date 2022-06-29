import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {JobApplyService} from "../../services/job-apply.service";
import {
    JobApplyCreateInputDto,
    JobApplyDeleteInputDto,
    JobApplyDto,
    JobApplySearchInputDto
} from "../../dtos/jobApply.dto";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";

@ApiTags('job-apply')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job-apply')
export class JobApplyController {

    constructor(
        private jobApplyService: JobApplyService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_APPLY_SEARCH)
    @ApiPaginatedResponse(JobApplyDto)
    @Get('search')
    search(
        @Query() search: JobApplySearchInputDto,
        @Query() page: PageOptionsDto
    ) {
        return this.jobApplyService.search(search, new PageOptionsDto(page));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_APPLY_CREATE)
    @ApiOkResponse({ type: JobApplyDto })
    @Post('create')
    create(
        @Body() data: JobApplyCreateInputDto
    ) {
        return this.jobApplyService.create(data);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_APPLY_DELETE)
    @Delete(':id')
    delete(
        @Param() data: JobApplyDeleteInputDto
    ) {
        return this.jobApplyService.delete(data.id);
    }
}
