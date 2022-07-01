import {ConflictException, ForbiddenException, Inject, Injectable, Request, Scope} from '@nestjs/common';
import {CreateOrEditUserCertificateDto} from "../dtos/user-certificate.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserCertificateEntity} from "../entities/userCertificate.entity";
import {Repository} from "typeorm";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../entities/user.entity";
import {PointJobUserQueue} from "../queues/point-job-user.queue";

@Injectable({ scope: Scope.REQUEST })
export class UserCertificateService {

    constructor(
        @InjectRepository(UserCertificateEntity)
        private userCertificateEntity: Repository<UserCertificateEntity>,
        @Inject(REQUEST) private request: Request,
        private pointJobUserQueue: PointJobUserQueue,
    ) {
    }

    getByCertificateId(certificateId: number) {
        const currentUser = this.request['user'] as UserEntity;
        return this.userCertificateEntity.findOne({
            where: {
                user: {
                    id: currentUser.id
                },
                certificate: {
                    id: certificateId
                }
            },
            relations: ['certificate']
        });
    }

    getAll() {
        const currentUser = this.request['user'] as UserEntity;
        return this.userCertificateEntity.find({
            where: {
              user: {
                  id: currentUser.id
              }
            },
            relations: ['certificate']
        });
    }

    async createOrEdit(dto: CreateOrEditUserCertificateDto) {
        const currentUser = this.request['user'] as UserEntity;
        let upId = dto.id;

        if (dto.id) {
            const data = await this.userCertificateEntity.findOne({
                where: {
                    id: dto.id,
                    user: {
                        id: currentUser.id
                    }
                },
                loadRelationIds: true
            });
            if (data) {
                const userCertificate = await this.userCertificateEntity.update(
                    { id: dto.id },
                    {
                        level: dto.level
                    }
                )
            } else {
                throw new ForbiddenException();
            }
        } else {
            const exists = await this.userCertificateEntity.findOne({
                where: {
                    user: {
                        id: currentUser.id
                    },
                    certificate: {
                        id: dto.certificate
                    }
                },
                relations: ['certificate']
            })
            if (exists) {
                throw new ConflictException(`${exists.certificate.name} đã tồn tại`);
            }
            const r = await this.userCertificateEntity.save([
                {
                    level: dto.level,
                    user: currentUser,
                    certificate: {
                        id: dto.certificate
                    }
                }
            ])
            upId = r[0].id;
        }

        await this.pointJobUserQueue.registerComputeUser(currentUser.id);

        return await this.userCertificateEntity.findOne({
            where: { id: upId },
            relations: ['certificate']
        })
    }

    async delete(id: number) {
        const currentUser = this.request['user'] as UserEntity;
        const exists = await this.userCertificateEntity.findOne({
            where: {
                user: { id: currentUser.id },
                id
            }
        })
        if (exists) {
            const r = await this.userCertificateEntity.delete(id);
            await this.pointJobUserQueue.registerComputeUser(currentUser.id);
            return r;
        }

        throw new ForbiddenException();
    }
}
