import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {UserPositionService} from "../../services/user-position.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {CreateOrEditUserPositionDto, DeleteUserPositionParamDto, UserPositionDto} from "../../dtos/user-position.dto";
import {AppPermission} from "../../polices/permission.enum";

@ApiTags('user-position')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-position')
export class UserPositionController {

    constructor(
        private userPositionService: UserPositionService
    ) {
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_POSITION_GET_ALL)
    @ApiOkResponse({ type: UserPositionDto })
    @Get('getAll')
    getAll() {
        return this.userPositionService.getAll();
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_POSITION_CE)
    @ApiOkResponse({ type: UserPositionDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() dto: CreateOrEditUserPositionDto
    ) {
        return this.userPositionService.createOrEdit(dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_POSITION_DELETE)
    @Delete(':id')
    delete(
        @Param() dto: DeleteUserPositionParamDto
    ) {
        return this.userPositionService.delete(dto.id);
    }
}
