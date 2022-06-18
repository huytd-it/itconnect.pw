import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {PositionService} from "../../services/position.service";
import {PositionDto, PositionSearchInputDto} from "../../dtos/position.dto";

@ApiTags('position')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('position')
export class PositionController {

    constructor(
        private positionService: PositionService
    ) {
    }

    @Get('search')
    @ApiPaginatedResponse(PositionDto)
    search(
        @Query() searchDto: PositionSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.positionService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

}
