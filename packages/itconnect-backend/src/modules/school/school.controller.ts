import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {CreateOrEditTag, PageOptionsDto} from "../../dtos/page.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {SchoolService} from "../../services/school.service";
import {SchoolCreateDto, SchoolDto, SchoolSearchInputDto} from "../../dtos/school.dto";
import {SchoolEntity} from "../../entities/school.entity";
import {SkillCreateDto} from "../../dtos/skill.dto";
import {PositionDto} from "../../dtos/position.dto";

@ApiTags('school')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('school')
export class SchoolController {

    constructor(
        private schoolService: SchoolService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.SCHOOL_SEARCH)
    @ApiPaginatedResponse(SchoolDto)
    @Get('search')
    search(
        @Query() searchDto: SchoolSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.schoolService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.SCHOOL_CREATE_TAG)
    @Post('create-tag')
    create(
        @Body() data: SchoolCreateDto,
    ) {
        return this.schoolService.create(data);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CREATE_OR_EDIT_TAG)
    @ApiOkResponse({ type: PositionDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditTag,
    ) {
        return this.schoolService.createOrEdit(data);
    }

}
