import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656768836902 implements MigrationInterface {
    name = 'mg1656768836902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`file_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, INDEX \`IDX_40ed92b74bec6ff4cda18398ea\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD \`avatarId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD UNIQUE INDEX \`IDX_cf20a072d16f846d20aa3b9018\` (\`avatarId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD \`bannerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD UNIQUE INDEX \`IDX_7d9b5df6757a4fdd462c3c856d\` (\`bannerId\`)`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD \`introduce\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD \`avatarId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD UNIQUE INDEX \`IDX_23f3f9e16a62a087b776f77804\` (\`avatarId\`)`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD \`bannerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD UNIQUE INDEX \`IDX_554201bf28096f323d3747a114\` (\`bannerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_cf20a072d16f846d20aa3b9018\` ON \`user_info_entity\` (\`avatarId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_7d9b5df6757a4fdd462c3c856d\` ON \`user_info_entity\` (\`bannerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_23f3f9e16a62a087b776f77804\` ON \`company_info_entity\` (\`avatarId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_554201bf28096f323d3747a114\` ON \`company_info_entity\` (\`bannerId\`)`);
        await queryRunner.query(`ALTER TABLE \`file_entity\` ADD CONSTRAINT \`FK_fb7f05b8927a1295e3c49dec4dd\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_cf20a072d16f846d20aa3b90183\` FOREIGN KEY (\`avatarId\`) REFERENCES \`file_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` ADD CONSTRAINT \`FK_7d9b5df6757a4fdd462c3c856d9\` FOREIGN KEY (\`bannerId\`) REFERENCES \`file_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_23f3f9e16a62a087b776f778040\` FOREIGN KEY (\`avatarId\`) REFERENCES \`file_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD CONSTRAINT \`FK_554201bf28096f323d3747a1147\` FOREIGN KEY (\`bannerId\`) REFERENCES \`file_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_554201bf28096f323d3747a1147\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP FOREIGN KEY \`FK_23f3f9e16a62a087b776f778040\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_7d9b5df6757a4fdd462c3c856d9\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP FOREIGN KEY \`FK_cf20a072d16f846d20aa3b90183\``);
        await queryRunner.query(`ALTER TABLE \`file_entity\` DROP FOREIGN KEY \`FK_fb7f05b8927a1295e3c49dec4dd\``);
        await queryRunner.query(`DROP INDEX \`REL_554201bf28096f323d3747a114\` ON \`company_info_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_23f3f9e16a62a087b776f77804\` ON \`company_info_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_7d9b5df6757a4fdd462c3c856d\` ON \`user_info_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_cf20a072d16f846d20aa3b9018\` ON \`user_info_entity\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP INDEX \`IDX_554201bf28096f323d3747a114\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP COLUMN \`bannerId\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP INDEX \`IDX_23f3f9e16a62a087b776f77804\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP COLUMN \`avatarId\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP COLUMN \`introduce\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP INDEX \`IDX_7d9b5df6757a4fdd462c3c856d\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP COLUMN \`bannerId\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP INDEX \`IDX_cf20a072d16f846d20aa3b9018\``);
        await queryRunner.query(`ALTER TABLE \`user_info_entity\` DROP COLUMN \`avatarId\``);
        await queryRunner.query(`DROP INDEX \`IDX_40ed92b74bec6ff4cda18398ea\` ON \`file_entity\``);
        await queryRunner.query(`DROP TABLE \`file_entity\``);
    }

}
