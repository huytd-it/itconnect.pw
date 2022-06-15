import {Body, ConflictException, Controller, Post, Res} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import { Response } from 'express';
import {UserService} from "../../services/user.service";
import {LoginInputDTO, RegisterInputDTO} from "./auth.dto";
import {RuntimeException} from "@nestjs/core/errors/exceptions/runtime.exception";
import {AuthService} from "./auth.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {
    }

    @Post('login')
    async login(
        @Body() dto: LoginInputDTO
    ) {
        return this.authService.signIn(dto);
    }

    @Post('register')
    async register(
        @Body() dto: RegisterInputDTO
    ) {
        return this.authService.register(dto);
    }
}
