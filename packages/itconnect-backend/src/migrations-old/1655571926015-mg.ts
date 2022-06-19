import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1655571926015 implements MigrationInterface {
    name = 'mg1655571926015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`parentId\` \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_165d4ff9dcabc15def46ffa8c20\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_0d66f3e9f22d5e62be548a6f02b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_1b8bcad73a6becddb565dc4efd7\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressProvinceId\` \`addressProvinceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressDistrictId\` \`addressDistrictId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressVillageId\` \`addressVillageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_0934e734a3f97d37788198f296c\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`userInfoId\` \`userInfoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_401509d24b0d71b01a0a0b98756\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_10b2a273ef381e46ae6fc67aa46\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`skillId\` \`skillId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` DROP FOREIGN KEY \`FK_0dec14fd40d546fdb101fb8408b\``);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` CHANGE \`userSkillsId\` \`userSkillsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_4bb7b007ab6347dad742d533715\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_8f6fff6b2239738702560ddb52b\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`positionId\` \`positionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` DROP FOREIGN KEY \`FK_f6235c0a767743f986d9cdffe3b\``);
        await queryRunner.query(`ALTER TABLE \`position_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` CHANGE \`userPositionsId\` \`userPositionsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_165d4ff9dcabc15def46ffa8c20\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_0d66f3e9f22d5e62be548a6f02b\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_1b8bcad73a6becddb565dc4efd7\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_0934e734a3f97d37788198f296c\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_401509d24b0d71b01a0a0b98756\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_10b2a273ef381e46ae6fc67aa46\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` ADD CONSTRAINT \`FK_0dec14fd40d546fdb101fb8408b\` FOREIGN KEY (\`userSkillsId\`) REFERENCES \`user_skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_4bb7b007ab6347dad742d533715\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_8f6fff6b2239738702560ddb52b\` FOREIGN KEY (\`positionId\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` ADD CONSTRAINT \`FK_f6235c0a767743f986d9cdffe3b\` FOREIGN KEY (\`userPositionsId\`) REFERENCES \`user_position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`position_entity\` DROP FOREIGN KEY \`FK_f6235c0a767743f986d9cdffe3b\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_8f6fff6b2239738702560ddb52b\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_4bb7b007ab6347dad742d533715\``);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` DROP FOREIGN KEY \`FK_0dec14fd40d546fdb101fb8408b\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_10b2a273ef381e46ae6fc67aa46\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_401509d24b0d71b01a0a0b98756\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_0934e734a3f97d37788198f296c\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_1b8bcad73a6becddb565dc4efd7\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_0d66f3e9f22d5e62be548a6f02b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_165d4ff9dcabc15def46ffa8c20\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`position_entity\` CHANGE \`userPositionsId\` \`userPositionsId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` ADD CONSTRAINT \`FK_f6235c0a767743f986d9cdffe3b\` FOREIGN KEY (\`userPositionsId\`) REFERENCES \`user_position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`positionId\` \`positionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_8f6fff6b2239738702560ddb52b\` FOREIGN KEY (\`positionId\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_4bb7b007ab6347dad742d533715\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` CHANGE \`userSkillsId\` \`userSkillsId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` ADD CONSTRAINT \`FK_0dec14fd40d546fdb101fb8408b\` FOREIGN KEY (\`userSkillsId\`) REFERENCES \`user_skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`skillId\` \`skillId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_10b2a273ef381e46ae6fc67aa46\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_401509d24b0d71b01a0a0b98756\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`userInfoId\` \`userInfoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_0934e734a3f97d37788198f296c\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressVillageId\` \`addressVillageId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressDistrictId\` \`addressDistrictId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`addressProvinceId\` \`addressProvinceId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_1b8bcad73a6becddb565dc4efd7\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_0d66f3e9f22d5e62be548a6f02b\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_165d4ff9dcabc15def46ffa8c20\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`parentId\` \`parentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
