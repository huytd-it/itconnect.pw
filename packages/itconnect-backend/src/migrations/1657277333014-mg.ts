import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657277333014 implements MigrationInterface {
    name = 'mg1657277333014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`pointSkill\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`pointPosition\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`pointCertificate\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`pointSchool\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`pointWorkFrom\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`pointLevelJob\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`pointLevelType\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`pointYoe\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`pointYoe\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`pointLevelType\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`pointLevelJob\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`pointWorkFrom\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`pointSchool\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`pointCertificate\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`pointPosition\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`pointSkill\``);
    }

}
