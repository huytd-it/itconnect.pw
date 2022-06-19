import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1655562761240 implements MigrationInterface {
    name = 'mg1655562761240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skill_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userSkillsId\` int NULL, INDEX \`IDX_f9600b0068f542043fc61430c8\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_skill_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`skillId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_info_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`addressStreet\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`addressProvinceId\` int NULL, \`addressDistrictId\` int NULL, \`addressVillageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`userInfoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD UNIQUE INDEX \`IDX_0934e734a3f97d37788198f296\` (\`userInfoId\`)`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`parentId\` \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0934e734a3f97d37788198f296\` ON \`user_entity\` (\`userInfoId\`)`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` ADD CONSTRAINT \`FK_0dec14fd40d546fdb101fb8408b\` FOREIGN KEY (\`userSkillsId\`) REFERENCES \`user_skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_401509d24b0d71b01a0a0b98756\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_10b2a273ef381e46ae6fc67aa46\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_0934e734a3f97d37788198f296c\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_165d4ff9dcabc15def46ffa8c20\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_0d66f3e9f22d5e62be548a6f02b\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_1b8bcad73a6becddb565dc4efd7\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_1b8bcad73a6becddb565dc4efd7\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_0d66f3e9f22d5e62be548a6f02b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_165d4ff9dcabc15def46ffa8c20\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_0934e734a3f97d37788198f296c\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_10b2a273ef381e46ae6fc67aa46\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_401509d24b0d71b01a0a0b98756\``);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` DROP FOREIGN KEY \`FK_0dec14fd40d546fdb101fb8408b\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`DROP INDEX \`REL_0934e734a3f97d37788198f296\` ON \`user_entity\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`parentId\` \`parentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP INDEX \`IDX_0934e734a3f97d37788198f296\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`userInfoId\``);
        await queryRunner.query(`DROP TABLE \`user_info_entity\``);
        await queryRunner.query(`DROP TABLE \`user_skill_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_f9600b0068f542043fc61430c8\` ON \`skill_entity\``);
        await queryRunner.query(`DROP TABLE \`skill_entity\``);
    }

}
