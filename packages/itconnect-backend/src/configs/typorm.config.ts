import {ConfigService} from "@nestjs/config";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(
        private config: ConfigService
    ) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.config.get<string>("MYSQL_HOST"),
            port: this.config.get<number>("MYSQL_PORT"),
            username: this.config.get<string>("MYSQL_USER"),
            password: this.config.get<string>("MYSQL_PASSWORD"),
            database: this.config.get<string>("MYSQL_DB"),
            entities: [],
            synchronize: true,
        }
    }
}
