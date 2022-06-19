import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {PageOptionsDto} from "../../dtos/page.dto";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {AddressDto, AddressSearchInputDto} from "../../dtos/address.dto";
import {AddressService} from "../../services/address.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {AddressEntity} from "../../entities/address.entity";
import {
    ApiPaginatedQueryOrder,
} from "../../utils/decorators/api-paginated-query-order.decorator";

@ApiTags('address')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {

    constructor(
        private addressService: AddressService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.ADDRESS_SEARCH)
    @ApiPaginatedResponse(AddressDto)
    @ApiPaginatedQueryOrder(AddressEntity)
    @Get('search')
    search(
        @Query() searchDto: AddressSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.addressService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }
}
