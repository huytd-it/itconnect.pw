import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656679649230 implements MigrationInterface {
    name = 'mg1656679649230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`computePointQueueId\` \`computePointQueueId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`computePointQueueId\` \`computePointQueueId\` varchar(255) NOT NULL`);
    }

}
