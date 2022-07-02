import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {UserService} from "../../services/user.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {UserDto, UserGetOneParamsDto} from "../../dtos/user.dto";
import {use} from "passport";

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER)
    @ApiOkResponse({ type: UserDto })
    @Get(':id')
    get(
        @Param() data: UserGetOneParamsDto
    ) {
        return this.userService.getOne(data.id);
    }
}
