import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {PositionService} from "../../services/position.service";
import {PositionCreateDto, PositionDto, PositionSearchInputDto} from "../../dtos/position.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {AddressEntity} from "../../entities/address.entity";
import {PositionEntity} from "../../entities/position.entity";
import {SkillCreateDto} from "../../dtos/skill.dto";

@ApiTags('position')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('position')
export class PositionController {

    constructor(
        private positionService: PositionService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.POSITION_SEARCH)
    @ApiPaginatedResponse(PositionDto)
    @ApiPaginatedQueryOrder(PositionEntity)
    @Get('search')
    search(
        @Query() searchDto: PositionSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.positionService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.POSITION_CREATE)
    @Post('create')
    create(
        @Body() data: PositionCreateDto,
    ) {
        return this.positionService.create(data);
    }
}
