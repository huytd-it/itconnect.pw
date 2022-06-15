import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {

    constructor(
        private config: ConfigService
    ) {
    }

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.config.get<string>("MYSQL_HOST"),
            port: this.config.get<number>("MYSQL_PORT"),
            username: this.config.get<string>("MYSQL_USER"),
            password: this.config.get<string>("MYSQL_PASSWORD"),
            database: this.config.get<string>("MYSQL_DB"),
            entities: [
                "dist/**/*.entity.js"
            ],
            migrations: [
                "dist/migrations/*.js"
            ],
            synchronize: false,
        };
    }
}
