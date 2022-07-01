import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {
    PeopleSearchBodyInputDto,
    PeopleSearchQueryInputDto
} from "../../dtos/people.dto";
import {PeopleService} from "../../services/people.service";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {PageOptionsDto} from "../../dtos/page.dto";
import {UserInfoDto} from "../../dtos/user-info.dto";
import {UserDto} from "../../dtos/user.dto";

@ApiTags('people')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('people')
export class PeopleController {

    constructor(
        private peopleService: PeopleService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PEOPLE_SEARCH)
    @ApiPaginatedResponse(UserDto)
    @Post('search')
    search(
        @Query() searchQuery: PeopleSearchQueryInputDto,
        @Body() searchBody: PeopleSearchBodyInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.peopleService.search(searchQuery, searchBody, new PageOptionsDto(pageOptionsDto));
    }

}
