import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656868791400 implements MigrationInterface {
    name = 'mg1656868791400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cd0768523afa5d38c9dbb55076\` ON \`company_info_entity\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cd0768523afa5d38c9dbb55076\` ON \`company_info_entity\` (\`mst\`)`);
    }

}
