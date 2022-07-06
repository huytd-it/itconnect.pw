import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {UserService} from "../../services/user.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {UserDto, UserGetOneParamsDto, UserSearchInputDto} from "../../dtos/user.dto";
import {use} from "passport";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {WorkFromDto, WorkFromSearchInputDto} from "../../dtos/workFrom.dto";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {WorkFromEntity} from "../../entities/workFrom.entity";
import {PageOptionsDto, StatisticOption} from "../../dtos/page.dto";
import {JobViewLogStatisticOption} from "../../dtos/job-view-log.dto";

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_SEARCH)
    @ApiPaginatedResponse(UserDto)
    @Get('search')
    search(
        @Query() searchDto: UserSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.userService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_BAN)
    @Put('ban/:id')
    ban(
        @Param() data: UserGetOneParamsDto
    ) {
        return this.userService.ban(data.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_BAN)
    @Put('unban/:id')
    unban(
        @Param() data: UserGetOneParamsDto
    ) {
        return this.userService.unban(data.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_VIEW_LOG_STS)
    @Post('sts')
    statistic(
        @Body() query: StatisticOption
    ) {
        return this.userService.sts(query);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.JOB_VIEW_LOG_STS)
    @Post('sts-ban')
    statisticBan(
        @Body() query: StatisticOption
    ) {
        return this.userService.stsBan(query);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_DELETE)
    @Delete(':id')
    delete(
        @Param() data: UserGetOneParamsDto
    ) {
        return this.userService.delete(data.id);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER)
    @ApiOkResponse({ type: UserDto })
    @Get(':id')
    get(
        @Param() data: UserGetOneParamsDto
    ) {
        return this.userService.getOne(data.id);
    }
}
