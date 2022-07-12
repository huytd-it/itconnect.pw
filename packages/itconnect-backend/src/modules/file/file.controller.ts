import {
    BadRequestException,
    Controller,
    Get, NotFoundException,
    Param,
    Post, Req, Response, StreamableFile,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../utils/guards/jwt.guard";
import {FileService} from "../../services/file.service";
import {PermissionsGuard} from "../../polices/permissions.guard";
import {RequirePermissions} from "../../polices/polices.decorator";
import {AppPermission} from "../../polices/permission.enum";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileDto, FileViewDto} from "../../dtos/file.dto";
import * as path from "path";
import * as fs from "fs";

@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
export class FileController {


    constructor(
        private fileService: FileService
    ) {
    }


    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @RequirePermissions(AppPermission.FILE_UPLOAD)
    @ApiOkResponse({ type: FileDto })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File) {
        if (!file?.filename) {
            throw new BadRequestException('Chỉ hổ trợ ảnh jpg, jpeg, png');
        }

        return this.fileService.save(file);
    }

    @Get('/s/:slug')
    async show(
        @Param() params: FileViewDto,
        @Response({ passthrough: true }) res
    ) {
        const row = await this.fileService.getBySlug(params.slug);
        if (!row) {
            throw new NotFoundException();
        }

        res.set({
            'Content-Type': row.mime
        });

        const file = path.join(this.fileService.uploadDir, row.path);
        try {
            const readStream = fs.createReadStream(file);
            return new StreamableFile(readStream);
        } catch (e) {
            throw new NotFoundException()
        }
    }
}
