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
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {AddressEntity} from "../../entities/address.entity";
import {WorkFromEntity} from "../../entities/workFrom.entity";
import {PointJobUserService} from "../../services/point-job-user.service";
import {PointJobUserDto, PointJobUserSearchInputDto} from "../../dtos/point-job-user.dto";

@ApiTags('point-job-user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('point-job-user')
export class PointJobUserController {

    constructor(
        private pointJobUserService: PointJobUserService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.POINT_JOB_USER_SEARCH)
    @ApiPaginatedResponse(PointJobUserDto)
    @Get('search')
    search(
        @Query() searchDto: PointJobUserSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.pointJobUserService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }
}
