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
    CreateOrEditCompanyProfileInputDto,
    CreateOrEditCompanyProfileOutputDto,
    CreateOrEditUserProfileInputDto,
    CreateOrUserProfileOutputDto, DataBoostrapOutputDto, SetAvatarBannerProfileInputDto
} from "../../dtos/profile.dto";
import {UserDto} from "../../dtos/user.dto";
import {UserInfoComputeYoe} from "../../dtos/user-info.dto";

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {

    constructor(
        private userService: UserService
    ) {
    }


    // note: need re-code
    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PROFILE_READ)
    @ApiOkResponse({ type: UserDto })
    @Get()
    getProfile(
        @GetUser() user: UserEntity
    ) {
        const {password, ...userOutput} = user;
        return userOutput;
    }

    // note: need re-code
    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PROFILE_DATA_BOOSTRAP)
    @ApiOkResponse({ type: DataBoostrapOutputDto })
    @Get('/data-boostrap')
    async getDataBoostrap(
        @GetUser() userFull: UserEntity
    ) {
        const permissions = appRolesConfig[userFull.role];
        const {password, ...user} = await this.userService.findOneFull(userFull.id);
        return {
            permissions,
            user
        }
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PROFILE_USER_CE)
    @ApiOkResponse({ type: CreateOrUserProfileOutputDto })
    @Post('/create-or-edit-user')
    completeUser(
        @Body() dto: CreateOrEditUserProfileInputDto,
        @GetUser() user: UserEntity
    ): Promise<CreateOrUserProfileOutputDto> {
        return this.userService.createOrEditUser(user, dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PROFILE_COMPANY_CE)
    @ApiOkResponse({ type: CreateOrEditCompanyProfileOutputDto })
    @Post('/create-or-edit-company')
    completeCompany(
        @Body() dto: CreateOrEditCompanyProfileInputDto,
        @GetUser() user: UserEntity
    ): Promise<CreateOrUserProfileOutputDto> {
        return this.userService.createOrEditCompany(user, dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PROFILE_COMPUTE_YOE)
    @ApiOkResponse({ type: UserInfoComputeYoe })
    @Get('/yoe')
    computeYoe(
        @GetUser() user: UserEntity
    ) {
        return this.userService.getComputeYoe(user);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.PROFILE_UPLOAD_IMG)
    @Post('/set-avatar-banner')
    setAvatarBanner(
        @Body() data: SetAvatarBannerProfileInputDto,
        @GetUser() user: UserEntity
    ) {
        return this.userService.setAvatarBanner(data, user);
    }
}