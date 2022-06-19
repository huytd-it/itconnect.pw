import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {SkillService} from "../../services/skill.service";
import {SkillDto, SkillSearchInputDto} from "../../dtos/skill.dto";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {AddressEntity} from "../../entities/address.entity";
import {SkillEntity} from "../../entities/skill.entity";

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
    @ApiPaginatedQueryOrder(SkillEntity)
    @Get('search')
    search(
        @Query() searchDto: SkillSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.skillService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

}
