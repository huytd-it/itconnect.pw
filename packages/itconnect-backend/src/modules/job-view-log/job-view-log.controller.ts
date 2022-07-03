import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {JobViewLogService} from "../../services/job-view-log.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {JobViewLogIdParamDto, JobViewLogStatisticOption} from "../../dtos/job-view-log.dto";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";

@ApiTags('job-view-log')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job-view-log')
export class JobViewLogController {

    constructor(
        private jobViewLogService: JobViewLogService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_VIEW_LOG_CREATE)
    @Put(':id')
    create(
        @Param() param: JobViewLogIdParamDto
    ) {
        return this.jobViewLogService.create(param.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_VIEW_LOG_STS)
    @Post('sts')
    statistic(
        @Body() query: JobViewLogStatisticOption
    ) {
        return this.jobViewLogService.sts(query);
    }
}
