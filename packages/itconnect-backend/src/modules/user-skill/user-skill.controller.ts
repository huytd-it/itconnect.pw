import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {UserSkillService} from "../../services/user-skill.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {CreateOrEditUserSkillDto, DeleteUserSkillParamDto, UserSkillDto} from "../../dtos/user-skill.dto";
import {AppPermission} from "../../polices/permission.enum";

@ApiTags('user-skill')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-skill')
export class UserSkillController {

    constructor(
        private userSkillService: UserSkillService
    ) {
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_POSITION_GET_ALL)
    @ApiOkResponse({ type: UserSkillDto })
    @Get('getAll')
    getAll() {
        return this.userSkillService.getAll();
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_POSITION_CE)
    @ApiOkResponse({ type: UserSkillDto })
    @Post('createOrEdit')
    createOrEdit(
        @Body() dto: CreateOrEditUserSkillDto
    ) {
        return this.userSkillService.createOrEdit(dto);
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.USER_POSITION_DELETE)
    @Delete(':id')
    delete(
        @Param() dto: DeleteUserSkillParamDto
    ) {
        return this.userSkillService.delete(dto.id);
    }
}
