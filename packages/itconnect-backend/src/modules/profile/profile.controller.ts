import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission, appRolesConfig} from "../../polices/permission.enum";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {UserService} from "../../services/user.service";
import {GetUser} from "../../utils/decorators/get-user.decorator";
import {UserEntity} from "../../entities/user.entity";
import {
    CompleteCompanyProfileInputDto,
    CompleteCompanyProfileOutputDto,
    CompleteUserProfileInputDto,
    CompleteUserProfileOutputDto
} from "../../dtos/profile.dto";

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

    @Get('/data-boostrap')
    getDataBoostrap(
        @GetUser() userFull: UserEntity
    ) {
        const permissions = appRolesConfig[userFull.role];
        const {password, ...user} = userFull;
        return {
            permissions,
            user
        }
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.COMPLETE_PROFILE)
    @ApiOkResponse({ type: CompleteUserProfileOutputDto })
    @Post('/complete-user')
    completeUser(
        @Body() dto: CompleteUserProfileInputDto,
        @GetUser() user: UserEntity
    ): Promise<CompleteUserProfileOutputDto> {
        return this.userService.completeProfile(user, dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.COMPLETE_PROFILE)
    @ApiOkResponse({ type: CompleteCompanyProfileOutputDto })
    @Post('/complete-company')
    completeCompany(
        @Body() dto: CompleteCompanyProfileInputDto,
        @GetUser() user: UserEntity
    ): Promise<CompleteUserProfileOutputDto> {
        return this.userService.completeCompany(user, dto);
    }
}