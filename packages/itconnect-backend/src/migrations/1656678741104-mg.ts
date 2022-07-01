import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656678741104 implements MigrationInterface {
    name = 'mg1656678741104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`computePointQueueId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`computePointQueueId\``);
    }

}
