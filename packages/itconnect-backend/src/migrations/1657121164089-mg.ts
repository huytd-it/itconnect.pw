import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657121164089 implements MigrationInterface {
    name = 'mg1657121164089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_apply_entity\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'waiting'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_apply_entity\` DROP COLUMN \`status\``);
    }

}
