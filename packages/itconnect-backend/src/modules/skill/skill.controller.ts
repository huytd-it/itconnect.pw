import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {SkillService} from "../../services/skill.service";
import {SkillDto, SkillSearchInputDto} from "../../dtos/skill.dto";

@ApiTags('skill')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('skill')
export class SkillController {

    constructor(
        private skillService: SkillService
    ) {
    }

    @Get('search')
    @ApiPaginatedResponse(SkillDto)
    search(
        @Query() searchDto: SkillSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.skillService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

}
