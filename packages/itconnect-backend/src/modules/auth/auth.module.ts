import {Global, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import {ServicesModule} from "../../services/services.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../entities/user.entity";

@Module({
    imports: [
        ServicesModule,
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: { expiresIn: '90d' },
                }
            }
        }),
    ],
    providers: [
        JwtStrategy,
        AuthService
    ],
    controllers: [AuthController]
})
export class AuthModule {}
