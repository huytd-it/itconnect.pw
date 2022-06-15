import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
import * as path from "path";
import {SequelizeModuleOptions, SequelizeOptionsFactory} from "@nestjs/sequelize";


@Injectable()
export class DatabaseConfigService implements SequelizeOptionsFactory {

    constructor(
        private config: ConfigService
    ) {
    }

    createSequelizeOptions(connectionName?: string): Promise<SequelizeModuleOptions> | SequelizeModuleOptions {
        return {
            dialect: 'mysql',
            host: this.config.get<string>("MYSQL_HOST"),
            port: this.config.get<number>("MYSQL_PORT"),
            username: this.config.get<string>("MYSQL_USER"),
            password: this.config.get<string>("MYSQL_PASSWORD"),
            database: this.config.get<string>("MYSQL_DB"),
        };
    }
}
