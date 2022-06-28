import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656414425387 implements MigrationInterface {
    name = 'mg1656414425387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_bb6ca3fd9ceb44a47859a43869\` ON \`address_entity\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f0bbcbe6185af9ad4ac8d13de6\` ON \`address_entity\` (\`name\`, \`type\`, \`parentId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f0bbcbe6185af9ad4ac8d13de6\` ON \`address_entity\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_bb6ca3fd9ceb44a47859a43869\` ON \`address_entity\` (\`name\`, \`type\`)`);
    }

}
