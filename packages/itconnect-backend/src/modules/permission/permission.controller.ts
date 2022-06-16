import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {GetUser} from "../../utils/decorators/get-user.decorator";
import {UserEntity} from "../../entities/user.entity";
import {AppPermission, appRolesConfig} from "../../polices/permission.enum";

@ApiTags('permission')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('permission')
export class PermissionController {


    @Get('/owner')
    getPermissionOwner(
        @GetUser() user: UserEntity
    ) {
        return appRolesConfig[user.role];
    }

}
