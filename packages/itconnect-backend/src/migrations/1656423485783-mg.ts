import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656423485783 implements MigrationInterface {
    name = 'mg1656423485783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD \`mst\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` ADD UNIQUE INDEX \`IDX_cd0768523afa5d38c9dbb55076\` (\`mst\`)`);
        await queryRunner.query(`ALTER TABLE \`company_tag_entity\` ADD \`mst\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company_tag_entity\` ADD UNIQUE INDEX \`IDX_b041fb39261c484b1c28df87c6\` (\`mst\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_tag_entity\` DROP INDEX \`IDX_b041fb39261c484b1c28df87c6\``);
        await queryRunner.query(`ALTER TABLE \`company_tag_entity\` DROP COLUMN \`mst\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP INDEX \`IDX_cd0768523afa5d38c9dbb55076\``);
        await queryRunner.query(`ALTER TABLE \`company_info_entity\` DROP COLUMN \`mst\``);
    }

}
