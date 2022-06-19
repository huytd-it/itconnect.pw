import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1655355575672 implements MigrationInterface {
    name = 'mg1655355575672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'begin'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` ON \`user_entity\` (\`email\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_158f20832b16ead19dcd50c743\` ON \`user_entity\` (\`role\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_158f20832b16ead19dcd50c743\` ON \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` ON \`user_entity\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`role\``);
    }

}
