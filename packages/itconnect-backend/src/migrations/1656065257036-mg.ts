import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656065257036 implements MigrationInterface {
    name = 'mg1656065257036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`yoe\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`yoe\``);
    }

}
