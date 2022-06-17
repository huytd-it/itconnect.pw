import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {PageOptionsDto} from "../../dtos/page.dto";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {AddressDto, AddressSearchInputDto} from "../../dtos/address.dto";
import {AddressService} from "../../services/address.service";

@ApiTags('address')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {

    constructor(
        private addressService: AddressService
    ) {
    }

    @Get('search')
    @ApiPaginatedResponse(AddressDto)
    search(
        @Query() searchDto: AddressSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.addressService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }
}
