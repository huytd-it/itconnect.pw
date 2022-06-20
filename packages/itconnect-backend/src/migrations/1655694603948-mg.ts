import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1655694603948 implements MigrationInterface {
    name = 'mg1655694603948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`parentId\` int NULL, INDEX \`IDX_04e1759cfac6874f76e2a11721\` (\`name\`), INDEX \`IDX_39d5f5d0d49f93a617b13b61fe\` (\`type\`), INDEX \`IDX_bb6ca3fd9ceb44a47859a43869\` (\`name\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skill_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_f9600b0068f542043fc61430c8\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_skill_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`skillId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_info_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`addressStreet\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`companyName\` varchar(255) NOT NULL, \`dayEstablish\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`addressProvinceId\` int NULL, \`addressDistrictId\` int NULL, \`addressVillageId\` int NULL, UNIQUE INDEX \`REL_bbd7576066b053fc16f76617e0\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'begin', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` (\`email\`), INDEX \`IDX_158f20832b16ead19dcd50c743\` (\`role\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_info_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`addressStreet\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`addressProvinceId\` int NULL, \`addressDistrictId\` int NULL, \`addressVillageId\` int NULL, \`jobLevelId\` int NULL, UNIQUE INDEX \`REL_9c391e2018f807b6843cdee35c\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_level_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_bd3ae16a1281da016b39e86fef\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_position_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`positionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`position_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_5aa970b42f0a6ce72351658bd2\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_from_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_b9ff15431d6b348f7b02f430d4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_401509d24b0d71b01a0a0b98756\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_10b2a273ef381e46ae6fc67aa46\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_bbd7576066b053fc16f76617e00\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_5e416a6fdc03f66de9b51d6e96a\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_a30325f01e55247deb78498649a\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_e23e7775e939d1ae14b4e7ee473\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_9c391e2018f807b6843cdee35ca\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_165d4ff9dcabc15def46ffa8c20\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_0d66f3e9f22d5e62be548a6f02b\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_1b8bcad73a6becddb565dc4efd7\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_e7b0e7181fd855f9f1e812e592b\` FOREIGN KEY (\`jobLevelId\`) REFERENCES \`job_level_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_4bb7b007ab6347dad742d533715\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_8f6fff6b2239738702560ddb52b\` FOREIGN KEY (\`positionId\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_8f6fff6b2239738702560ddb52b\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_4bb7b007ab6347dad742d533715\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_e7b0e7181fd855f9f1e812e592b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_1b8bcad73a6becddb565dc4efd7\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_0d66f3e9f22d5e62be548a6f02b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_165d4ff9dcabc15def46ffa8c20\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_9c391e2018f807b6843cdee35ca\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_e23e7775e939d1ae14b4e7ee473\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_a30325f01e55247deb78498649a\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_5e416a6fdc03f66de9b51d6e96a\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_bbd7576066b053fc16f76617e00\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_10b2a273ef381e46ae6fc67aa46\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_401509d24b0d71b01a0a0b98756\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9ff15431d6b348f7b02f430d4\` ON \`work_from_entity\``);
        await queryRunner.query(`DROP TABLE \`work_from_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_5aa970b42f0a6ce72351658bd2\` ON \`position_entity\``);
        await queryRunner.query(`DROP TABLE \`position_entity\``);
        await queryRunner.query(`DROP TABLE \`user_position_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd3ae16a1281da016b39e86fef\` ON \`job_level_entity\``);
        await queryRunner.query(`DROP TABLE \`job_level_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_9c391e2018f807b6843cdee35c\` ON \`user_info_entity\``);
        await queryRunner.query(`DROP TABLE \`user_info_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_158f20832b16ead19dcd50c743\` ON \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` ON \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_bbd7576066b053fc16f76617e0\` ON \`company_info_entity\``);
        await queryRunner.query(`DROP TABLE \`company_info_entity\``);
        await queryRunner.query(`DROP TABLE \`user_skill_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_f9600b0068f542043fc61430c8\` ON \`skill_entity\``);
        await queryRunner.query(`DROP TABLE \`skill_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb6ca3fd9ceb44a47859a43869\` ON \`address_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_39d5f5d0d49f93a617b13b61fe\` ON \`address_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_04e1759cfac6874f76e2a11721\` ON \`address_entity\``);
        await queryRunner.query(`DROP TABLE \`address_entity\``);
    }

}
