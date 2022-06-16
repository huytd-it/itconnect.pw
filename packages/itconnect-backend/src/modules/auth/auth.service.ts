import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {LoginInputDTO, RegisterInputDTO} from "./auth.dto";
import {RuntimeException} from "@nestjs/core/errors/exceptions/runtime.exception";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
    }

    async signIn(dto: LoginInputDTO) {
        let user = await this.usersRepository.findOne({
            where: {
                email: dto.email
            }
        });

        let done = true;
        if (!user) {
            done = false;
        }

        if (done && !bcrypt.compareSync(dto.password, user.password)) {
            done = false;
        }

        if (!done) {
            throw new UnauthorizedException('Email or password not correct');
        }

        return {
            token: this.signUser(user.id),
        }
    }

    async register(dto: RegisterInputDTO) {
        let user = await this.usersRepository.findOne({
            where: {
                email: dto.email
            }
        });
        if (user) {
            throw new ConflictException('Email exists');
        }

        user = await this.usersRepository.save({
            email: dto.email,
            password: bcrypt.hashSync(dto.password, 12)
        });
        if (user) {
            return {
                token: this.signUser(user.id),
            }
        }

        throw new RuntimeException();
    }

    signUser(user: number) {
        return this.jwtService.sign({
            user
        })
    }

    verifyJwt(token: string) {
        return this.jwtService.verify(
            token,
            {
                ignoreExpiration: false,
                secret: this.configService.get<string>("JWT_SECRET")
            }
        )
    }
}
