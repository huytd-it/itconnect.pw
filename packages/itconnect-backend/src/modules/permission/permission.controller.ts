import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {GetUser} from "../../utils/decorators/get-user.decorator";
import {UserEntity} from "../../entities/user.entity";
import {AppPermission, appRolesConfig} from "../../polices/permission.enum";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";

@ApiTags('permission')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('permission')
export class PermissionController {


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PERMISSION_OWNER)
    @Get('/owner')
    getPermissionOwner(
        @GetUser() user: UserEntity
    ) {
        return appRolesConfig[user.role];
    }

}
