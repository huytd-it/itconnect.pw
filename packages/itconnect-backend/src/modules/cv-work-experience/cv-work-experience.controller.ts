import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {CvWorkExperienceService} from "../../services/cv-work-experience.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {
    CreateOrEditCvWorkExperienceDto, CvWorkExperienceApplyDto,
    CvWorkExperienceDeleteDto,
    CvWorkExperienceDto, CvWorkExperienceSearchInputDto
} from "../../dtos/cv-work-experience.dto";
import {ApiPaginatedResponse} from "../../utils/decorators/api-paginated-response.decorator";
import {JobLevelDto, JobLevelSearchInputDto} from "../../dtos/jobLevel.dto";
import {ApiPaginatedQueryOrder} from "../../utils/decorators/api-paginated-query-order.decorator";
import {JobLevelEntity} from "../../entities/jobLevel.entity";
import {PageOptionsDto} from "../../dtos/page.dto";

@ApiTags('cv-work-experience')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cv-work-experience')
export class CvWorkExperienceController {


    constructor(
        private cvWorkExperienceService: CvWorkExperienceService
    ) {
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_SEARCH)
    @ApiPaginatedResponse(CvWorkExperienceDto)
    @Get('search')
    search(
        @Query() searchDto: CvWorkExperienceSearchInputDto,
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        return this.cvWorkExperienceService.search(searchDto, new PageOptionsDto(pageOptionsDto));
    }

    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_APPLY)
    @ApiOkResponse({ type: CvWorkExperienceDto })
    @Post('/apply')
    apply(
        @Body() data: CvWorkExperienceApplyDto
    ) {
        return this.cvWorkExperienceService.apply(data);
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_GET_OWNER)
    @ApiOkResponse({ type: CvWorkExperienceDto, isArray: true })
    @Get('/getOwner')
    getOwner() {
        return this.cvWorkExperienceService.getOwner();
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_CE)
    @ApiOkResponse({ type: CvWorkExperienceDto })
    @Post('/createOrEdit')
    createOrEdit(
        @Body() data: CreateOrEditCvWorkExperienceDto
    ) {
        return this.cvWorkExperienceService.createOrEdit(data);
    }


    @UseGuards(PermissionsGuard)
    @RequirePermissions(AppPermission.CV_WORK_EXPERIENCE_DELETE)
    @ApiOkResponse({ type: CvWorkExperienceDto })
    @Delete('/:id')
    delete(
        @Param() data: CvWorkExperienceDeleteDto
    ) {
        return this.cvWorkExperienceService.delete(data.id);
    }


}
