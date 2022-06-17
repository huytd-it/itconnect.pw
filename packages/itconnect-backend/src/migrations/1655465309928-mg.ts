import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1655465309928 implements MigrationInterface {
    name = 'mg1655465309928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` int NOT NULL, \`parentId\` int NULL, INDEX \`IDX_04e1759cfac6874f76e2a11721\` (\`name\`), INDEX \`IDX_39d5f5d0d49f93a617b13b61fe\` (\`type\`), INDEX \`IDX_bb6ca3fd9ceb44a47859a43869\` (\`name\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`address_entity\` ADD CONSTRAINT \`FK_d96e5f9914d0f80c787b8da289b\` FOREIGN KEY (\`parentId\`) REFERENCES \`address_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address_entity\` DROP FOREIGN KEY \`FK_d96e5f9914d0f80c787b8da289b\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_bb6ca3fd9ceb44a47859a43869\` ON \`address_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_39d5f5d0d49f93a617b13b61fe\` ON \`address_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_04e1759cfac6874f76e2a11721\` ON \`address_entity\``);
        await queryRunner.query(`DROP TABLE \`address_entity\``);
    }

}
