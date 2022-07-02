import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656772318267 implements MigrationInterface {
    name = 'mg1656772318267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_7d9b5df6757a4fdd462c3c856d\` ON \`user_info_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_cf20a072d16f846d20aa3b9018\` ON \`user_info_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_23f3f9e16a62a087b776f77804\` ON \`company_info_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_554201bf28096f323d3747a114\` ON \`company_info_entity\``);
        await queryRunner.query(`ALTER TABLE \`file_entity\` ADD \`mime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`file_entity\` ADD \`size\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file_entity\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`file_entity\` DROP COLUMN \`mime\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_554201bf28096f323d3747a114\` ON \`company_info_entity\` (\`bannerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_23f3f9e16a62a087b776f77804\` ON \`company_info_entity\` (\`avatarId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cf20a072d16f846d20aa3b9018\` ON \`user_info_entity\` (\`avatarId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_7d9b5df6757a4fdd462c3c856d\` ON \`user_info_entity\` (\`bannerId\`)`);
    }

}
