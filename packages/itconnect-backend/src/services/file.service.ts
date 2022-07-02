import {Inject, Injectable, Request, Scope} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FileEntity} from "../entities/file.entity";
import {Repository} from "typeorm";
import * as path from "path";
import {ConfigService} from "@nestjs/config";
import { v4 as uuid4 } from 'uuid';
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {Id} from "../utils/function";

@Injectable({ scope: Scope.REQUEST })
export class FileService {

    constructor(
        @Inject(REQUEST) private request: Request,
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>,
        private configService: ConfigService
    ) {
    }

    get uploadDir() {
        return this.configService.get('NODE_ENV') === 'development' ?
            path.join(process.cwd(), this.configService.get('DIR_FILE')) :
            this.configService.get('DIR_FILE');
    }


    async save(file: Express.Multer.File) {
        const slug = uuid4();
        const result = await this.fileRepository.save({
            path: file.filename,
            mime: file.mimetype,
            size: file.size,
            slug
        })
        delete result.path;
        return result;
    }

    getBySlug(slug: string) {
        return this.fileRepository.findOne({
            where: {
                slug
            },
            select: {
                id: true,
                path: true,
                slug: true,
                mime: true
            }
        })
    }

    owner(id: number) {
        const user = this.request['user'] as UserEntity;
        return this.fileRepository.findOne({
            where: {
                id,
                user: Id(user.id)
            }
        })
    }
}