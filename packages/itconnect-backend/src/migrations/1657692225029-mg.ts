import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657692225029 implements MigrationInterface {
    name = 'mg1657692225029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` CHANGE \`point\` \`point\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` CHANGE \`pointExp\` \`pointExp\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` CHANGE \`pointExpVerified\` \`pointExpVerified\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` CHANGE \`pointExpVerified\` \`pointExpVerified\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` CHANGE \`pointExp\` \`pointExp\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`point_config_entity\` CHANGE \`point\` \`point\` int NOT NULL`);
    }

}
