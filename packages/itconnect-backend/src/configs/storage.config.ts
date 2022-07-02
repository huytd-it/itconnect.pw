import {Injectable} from "@nestjs/common";
import {
    MulterModuleOptions,
    MulterOptionsFactory
} from "@nestjs/platform-express/multer/interfaces/files-upload-module.interface";
import {diskStorage} from "multer";
import * as path from "path";
import { v4 as uuid4 } from "uuid";
import {ConfigService} from "@nestjs/config";

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';
const validFileExtensions : validFileExtension [] = ['png', 'jpg', 'jpeg'];
const validMimeTypes : validMimeType[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
];

@Injectable()
export class StorageConfig implements MulterOptionsFactory {

    constructor(
        private configService: ConfigService
    ) {
    }

    createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
        const p = this.configService.get('NODE_ENV') === 'development' ?
            path.join(process.cwd(), this.configService.get('DIR_FILE')) :
            this.configService.get('DIR_FILE');
        return {
            storage: diskStorage ({
                destination: p,
                filename: (req, file, cb) => {
                    const fileExtension: string = path.extname(file.originalname);
                    const fileName: string = uuid4() + fileExtension;
                    cb(null, fileName);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedMimeTypes: validMimeType[] = validMimeTypes;
                allowedMimeTypes.includes(file.mimetype as any) ? cb(null, true) : cb(null, false);
            },
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        };
    }
}