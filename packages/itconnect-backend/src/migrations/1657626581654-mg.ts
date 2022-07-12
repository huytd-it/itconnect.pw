import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657626581654 implements MigrationInterface {
    name = 'mg1657626581654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` CHANGE \`size\` \`size\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` CHANGE \`size\` \`size\` int NOT NULL`);
    }

}
