import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterInputDTO {
    @ApiProperty({
        description: 'Email',
        type: String
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Password',
        type: String
    })
    @MinLength(6)
    @MaxLength(32)
    password: string;
}

export class LoginInputDTO {
    @ApiProperty({
        description: 'Email',
        type: String
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password',
        type: String
    })
    @MinLength(6)
    @MaxLength(32)
    password: string;
}