import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656087546719 implements MigrationInterface {
    name = 'mg1656087546719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`descriptionContent\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`descriptionContent\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`requirementContent\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`requirementContent\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`reasonContent\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`reasonContent\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`reasonContent\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`reasonContent\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`requirementContent\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`requirementContent\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`descriptionContent\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`descriptionContent\` varchar(255) NOT NULL`);
    }

}
