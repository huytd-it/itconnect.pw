import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {HasRowField} from "../../validators/has-row-field.validate";
import {UserEntity} from "../../entities/user.entity";

export class RegisterInputDTO {
    @ApiProperty({
        description: 'Email',
        type: String
    })
    @IsEmail()
    @IsNotEmpty()
    @HasRowField(UserEntity)
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
        type: String,
        minLength: 6,
        maxLength: 32
    })
    @MinLength(6)
    @MaxLength(32)
    password: string;
}

export class LoginOutputDTO {
    @ApiProperty()
    token: string;
}

export class RegisterOutputDTO {
    @ApiProperty()
    token: string;
}