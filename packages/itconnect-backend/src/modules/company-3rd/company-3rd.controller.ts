import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {Company3Rd, Company3RdSearchInputDto} from "../../dtos/company-3rd.dto";
import {PageOptionsDto} from "../../dtos/page.dto";
import {Company3rdService} from "../../services/company-3rd.service";

@ApiTags('company-3rd')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company-3rd')
export class Company3rdController {

    constructor(
        private company3rdService: Company3rdService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.COMPANY_3RD_SEARCH)
    @ApiPaginatedResponse(Company3Rd)
    @Get('/search')
    search(
        @Query() search: Company3RdSearchInputDto,
        @Query() page: PageOptionsDto
    ) {
        return this.company3rdService.search(search, new PageOptionsDto(page))
    }

}
