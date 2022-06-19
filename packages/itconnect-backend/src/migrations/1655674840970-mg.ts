import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1655674840970 implements MigrationInterface {
    name = 'mg1655674840970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skill_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_f9600b0068f542043fc61430c8\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_skill_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`skillId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`parentId\` int NULL, INDEX \`IDX_04e1759cfac6874f76e2a11721\` (\`name\`), INDEX \`IDX_39d5f5d0d49f93a617b13b61fe\` (\`type\`), INDEX \`IDX_bb6ca3fd9ceb44a47859a43869\` (\`name\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_level_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_bd3ae16a1281da016b39e86fef\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_info_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`addressStreet\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`addressProvinceId\` int NULL, \`addressDistrictId\` int NULL, \`addressVillageId\` int NULL, \`jobLevelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_section_control_type_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`tag\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`tag_unique\` (\`tag\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_sec_data_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`cvSecBuilderId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_sec_data_row_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`cvSecDataId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_sec_control_data_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`cvSecDataRowId\` int NULL, \`cvSecBuilderSectionControlTypeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_control_select_type_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`tag\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`tag_unique\` (\`tag\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_sec_builder_section_control_type_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderPosition\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`cvControlSelectTypeId\` int NULL, \`cvSecBuilderId\` int NULL, \`cvSectionControlTypeId\` int NULL, INDEX \`IDX_63079fbc2f51eea38a9a7ee76d\` (\`orderPosition\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_sec_builder_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` int NOT NULL, \`tag\` varchar(255) NOT NULL, \`max_data_row\` int NOT NULL DEFAULT '1', \`isGlobal\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, INDEX \`IDX_4dac628711a8f32e51734e9a36\` (\`isGlobal\`), UNIQUE INDEX \`tag_unique\` (\`tag\`), UNIQUE INDEX \`userId_name_unique\` (\`name\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'begin', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userInfoId\` int NULL, \`companyInfoId\` int NULL, INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` (\`email\`), INDEX \`IDX_158f20832b16ead19dcd50c743\` (\`role\`), UNIQUE INDEX \`REL_0934e734a3f97d37788198f296\` (\`userInfoId\`), UNIQUE INDEX \`REL_5e96f265469267c6c27191b687\` (\`companyInfoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_info_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`addressStreet\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`companyName\` varchar(255) NOT NULL, \`dayEstablish\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`addressProvinceId\` int NULL, \`addressDistrictId\` int NULL, \`addressVillageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_position_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`positionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`position_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_5aa970b42f0a6ce72351658bd2\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_from_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_b9ff15431d6b348f7b02f430d4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_401509d24b0d71b01a0a0b98756\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` ADD CONSTRAINT \`FK_10b2a273ef381e46ae6fc67aa46\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_165d4ff9dcabc15def46ffa8c20\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_0d66f3e9f22d5e62be548a6f02b\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_1b8bcad73a6becddb565dc4efd7\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_e7b0e7181fd855f9f1e812e592b\` FOREIGN KEY (\`jobLevelId\`) REFERENCES \`job_level_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_data_entity\` ADD CONSTRAINT \`FK_3e05bb5c8b559bcf99086887e67\` FOREIGN KEY (\`cvSecBuilderId\`) REFERENCES \`cv_sec_builder_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_data_entity\` ADD CONSTRAINT \`FK_b43fe610aeff5d2c50e36b22724\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_data_row_entity\` ADD CONSTRAINT \`FK_d16f79b6b89b5bdf57e99ee8701\` FOREIGN KEY (\`cvSecDataId\`) REFERENCES \`cv_sec_data_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_control_data_entity\` ADD CONSTRAINT \`FK_c9f534b44b76e35620cd7fe7165\` FOREIGN KEY (\`cvSecDataRowId\`) REFERENCES \`cv_sec_data_row_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_control_data_entity\` ADD CONSTRAINT \`FK_e06fd1a4dc343d7e33b578f0404\` FOREIGN KEY (\`cvSecBuilderSectionControlTypeId\`) REFERENCES \`cv_sec_builder_section_control_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_builder_section_control_type_entity\` ADD CONSTRAINT \`FK_dddd91861299432578ea49ccb59\` FOREIGN KEY (\`cvControlSelectTypeId\`) REFERENCES \`cv_control_select_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_builder_section_control_type_entity\` ADD CONSTRAINT \`FK_29b90730a1a208c7b54a1eee9b0\` FOREIGN KEY (\`cvSecBuilderId\`) REFERENCES \`cv_sec_builder_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_builder_section_control_type_entity\` ADD CONSTRAINT \`FK_4317c257e253e4012b8cdda3e47\` FOREIGN KEY (\`cvSectionControlTypeId\`) REFERENCES \`cv_section_control_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_sec_builder_entity\` ADD CONSTRAINT \`FK_7c99c304cf66aeed6e382e352cc\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_0934e734a3f97d37788198f296c\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_5e96f265469267c6c27191b6877\` FOREIGN KEY (\`companyInfoId\`) REFERENCES \`company_info_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_5e416a6fdc03f66de9b51d6e96a\` FOREIGN KEY (\`addressProvinceId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_a30325f01e55247deb78498649a\` FOREIGN KEY (\`addressDistrictId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_e23e7775e939d1ae14b4e7ee473\` FOREIGN KEY (\`addressVillageId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_4bb7b007ab6347dad742d533715\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` ADD CONSTRAINT \`FK_8f6fff6b2239738702560ddb52b\` FOREIGN KEY (\`positionId\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_8f6fff6b2239738702560ddb52b\``);
        await queryRunner.query(`ALTER TABLE \`user_position_entity\` DROP FOREIGN KEY \`FK_4bb7b007ab6347dad742d533715\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_e23e7775e939d1ae14b4e7ee473\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_a30325f01e55247deb78498649a\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_5e416a6fdc03f66de9b51d6e96a\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_5e96f265469267c6c27191b6877\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_0934e734a3f97d37788198f296c\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_builder_entity\` DROP FOREIGN KEY \`FK_7c99c304cf66aeed6e382e352cc\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_builder_section_control_type_entity\` DROP FOREIGN KEY \`FK_4317c257e253e4012b8cdda3e47\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_builder_section_control_type_entity\` DROP FOREIGN KEY \`FK_29b90730a1a208c7b54a1eee9b0\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_builder_section_control_type_entity\` DROP FOREIGN KEY \`FK_dddd91861299432578ea49ccb59\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_control_data_entity\` DROP FOREIGN KEY \`FK_e06fd1a4dc343d7e33b578f0404\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_control_data_entity\` DROP FOREIGN KEY \`FK_c9f534b44b76e35620cd7fe7165\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_data_row_entity\` DROP FOREIGN KEY \`FK_d16f79b6b89b5bdf57e99ee8701\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_data_entity\` DROP FOREIGN KEY \`FK_b43fe610aeff5d2c50e36b22724\``);
        await queryRunner.query(`ALTER TABLE \`cv_sec_data_entity\` DROP FOREIGN KEY \`FK_3e05bb5c8b559bcf99086887e67\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_e7b0e7181fd855f9f1e812e592b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_1b8bcad73a6becddb565dc4efd7\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_0d66f3e9f22d5e62be548a6f02b\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_165d4ff9dcabc15def46ffa8c20\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_10b2a273ef381e46ae6fc67aa46\``);
        await queryRunner.query(`ALTER TABLE \`user_skill_entity\` DROP FOREIGN KEY \`FK_401509d24b0d71b01a0a0b98756\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9ff15431d6b348f7b02f430d4\` ON \`work_from_entity\``);
        await queryRunner.query(`DROP TABLE \`work_from_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_5aa970b42f0a6ce72351658bd2\` ON \`position_entity\``);
        await queryRunner.query(`DROP TABLE \`position_entity\``);
        await queryRunner.query(`DROP TABLE \`user_position_entity\``);
        await queryRunner.query(`DROP TABLE \`company_info_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_5e96f265469267c6c27191b687\` ON \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_0934e734a3f97d37788198f296\` ON \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_158f20832b16ead19dcd50c743\` ON \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` ON \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`userId_name_unique\` ON \`cv_sec_builder_entity\``);
        await queryRunner.query(`DROP INDEX \`tag_unique\` ON \`cv_sec_builder_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_4dac628711a8f32e51734e9a36\` ON \`cv_sec_builder_entity\``);
        await queryRunner.query(`DROP TABLE \`cv_sec_builder_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_63079fbc2f51eea38a9a7ee76d\` ON \`cv_sec_builder_section_control_type_entity\``);
        await queryRunner.query(`DROP TABLE \`cv_sec_builder_section_control_type_entity\``);
        await queryRunner.query(`DROP INDEX \`tag_unique\` ON \`cv_control_select_type_entity\``);
        await queryRunner.query(`DROP TABLE \`cv_control_select_type_entity\``);
        await queryRunner.query(`DROP TABLE \`cv_sec_control_data_entity\``);
        await queryRunner.query(`DROP TABLE \`cv_sec_data_row_entity\``);
        await queryRunner.query(`DROP TABLE \`cv_sec_data_entity\``);
        await queryRunner.query(`DROP INDEX \`tag_unique\` ON \`cv_section_control_type_entity\``);
        await queryRunner.query(`DROP TABLE \`cv_section_control_type_entity\``);
        await queryRunner.query(`DROP TABLE \`user_info_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd3ae16a1281da016b39e86fef\` ON \`job_level_entity\``);
        await queryRunner.query(`DROP TABLE \`job_level_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb6ca3fd9ceb44a47859a43869\` ON \`address_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_39d5f5d0d49f93a617b13b61fe\` ON \`address_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_04e1759cfac6874f76e2a11721\` ON \`address_entity\``);
        await queryRunner.query(`DROP TABLE \`address_entity\``);
        await queryRunner.query(`DROP TABLE \`user_skill_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_f9600b0068f542043fc61430c8\` ON \`skill_entity\``);
        await queryRunner.query(`DROP TABLE \`skill_entity\``);
    }

}
