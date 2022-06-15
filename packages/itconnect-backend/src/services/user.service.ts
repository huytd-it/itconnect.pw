import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {
    }

    findByEmail(email: string) {
        return this.usersRepository.findOne({
            where: {
                email
            }
        });
    }
}
