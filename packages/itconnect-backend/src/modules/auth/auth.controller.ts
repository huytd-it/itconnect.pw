import {Body, Controller, Post, Res} from '@nestjs/common';
import {ApiOkResponse, ApiResponse, ApiResponseProperty, ApiTags} from "@nestjs/swagger";
import {LoginInputDTO, LoginOutputDTO, RegisterInputDTO, RegisterOutputDTO} from "./auth.dto";
import {AuthService} from "./auth.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {
    }

    @Post('login')
    @ApiOkResponse({ type: LoginOutputDTO })
    async login(
        @Body() dto: LoginInputDTO
    ): Promise<LoginOutputDTO> {
        return this.authService.signIn(dto);
    }

    @Post('register')
    @ApiOkResponse({ type: RegisterOutputDTO })
    async register(
        @Body() dto: RegisterInputDTO
    ): Promise<RegisterOutputDTO> {
        return this.authService.register(dto);
    }
}
