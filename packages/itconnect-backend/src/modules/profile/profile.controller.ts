import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {UserService} from "../../services/user.service";
import {GetUser} from "../../utils/decorators/get-user.decorator";
import {UserEntity} from "../../entities/user.entity";

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {

    constructor(
        private userService: UserService
    ) {
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PROFILE_READ)
    @Get()
    getProfile(
        @GetUser() user: UserEntity
    ) {
        const {password, ...userOutput} = user;
        return userOutput;
    }
}