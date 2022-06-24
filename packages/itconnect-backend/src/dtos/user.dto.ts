import {EntityDto} from "./abstract.dto";
import {ApiProperty} from "@nestjs/swagger";
import {UserInfoDto} from "./user-info.dto";

export class UserDto extends EntityDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    userInfo: UserInfoDto
}