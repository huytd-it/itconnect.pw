import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657626081222 implements MigrationInterface {
    name = 'mg1657626081222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`size\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`size\``);
    }

}
