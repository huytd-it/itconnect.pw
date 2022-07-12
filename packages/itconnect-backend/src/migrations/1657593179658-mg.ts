import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657593179658 implements MigrationInterface {
    name = 'mg1657593179658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` ADD \`pointExp\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` ADD \`pointExpVerified\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` DROP COLUMN \`pointExpVerified\``);
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` DROP COLUMN \`pointExp\``);
    }

}
