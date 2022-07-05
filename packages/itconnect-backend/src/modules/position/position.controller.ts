import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {CreateOrEditTag, PageOptionsDto} from "../../dtos/page.dto";
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
    @Get('search')
    search(
        @Query() searchDto: PositionSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.positionService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.POSITION_CREATE_TAG)
    @ApiOkResponse({ type: PositionDto })
    @Post('create-tag')
    createTag(
        @Body() data: PositionCreateDto,
    ) {
        return this.positionService.create(data);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CREATE_OR_EDIT_TAG)
    @ApiOkResponse({ type: PositionDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditTag,
    ) {
        return this.positionService.createOrEdit(data);
    }
}
