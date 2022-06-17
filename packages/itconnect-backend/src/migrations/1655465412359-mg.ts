import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1655465412359 implements MigrationInterface {
    name = 'mg1655465412359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`parentId\` \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` CHANGE \`parentId\` \`parentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP COLUMN \`createdAt\``);
    }

}
