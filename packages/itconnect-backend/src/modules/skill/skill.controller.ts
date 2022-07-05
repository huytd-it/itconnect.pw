import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {CreateOrEditTag, PageOptionsDto} from "../../dtos/page.dto";
import {SkillService} from "../../services/skill.service";
import {SkillCreateDto, SkillDto, SkillSearchInputDto} from "../../dtos/skill.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {SkillEntity} from "../../entities/skill.entity";
import {DeleteParamsDto} from "../../dtos/abstract.dto";
import {PositionDto} from "../../dtos/position.dto";

@ApiTags('skill')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('skill')
export class SkillController {

    constructor(
        private skillService: SkillService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.SKILL_SEARCH)
    @ApiPaginatedResponse(SkillDto)
    @Get('search')
    search(
        @Query() searchDto: SkillSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.skillService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.SKILL_CREATE_TAG)
    @Post('create-tag')
    createTag(
        @Body() data: SkillCreateDto,
    ) {
        return this.skillService.create(data);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CREATE_OR_EDIT_TAG)
    @ApiOkResponse({ type: PositionDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditTag,
    ) {
        return this.skillService.createOrEdit(data);
    }
}
