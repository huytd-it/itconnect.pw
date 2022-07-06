import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657140160379 implements MigrationInterface {
    name = 'mg1657140160379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cv_work_experience_entity\` ADD \`status\` int NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cv_work_experience_entity\` DROP COLUMN \`status\``);
    }

}
