import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {PermissionsGuard} from "../../polices/permissions.guard";

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.COMPLETE_PROFILE)
    @Get('/test')
    test() {
    }
}