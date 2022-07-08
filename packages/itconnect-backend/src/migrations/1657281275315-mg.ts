import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657281275315 implements MigrationInterface {
    name = 'mg1657281275315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`msg\` varchar(255) NULL, \`userId\` int NULL, \`userTargetId\` int NULL, \`jobTargetId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification_entity\` ADD CONSTRAINT \`FK_dd9edd17abec9f32798a1f1e22d\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification_entity\` ADD CONSTRAINT \`FK_aff550d8faa7190b0969ffe5f67\` FOREIGN KEY (\`userTargetId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification_entity\` ADD CONSTRAINT \`FK_e7efdc6dc72ddd564ea44d40ff8\` FOREIGN KEY (\`jobTargetId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification_entity\` DROP FOREIGN KEY \`FK_e7efdc6dc72ddd564ea44d40ff8\``);
        await queryRunner.query(`ALTER TABLE \`notification_entity\` DROP FOREIGN KEY \`FK_aff550d8faa7190b0969ffe5f67\``);
        await queryRunner.query(`ALTER TABLE \`notification_entity\` DROP FOREIGN KEY \`FK_dd9edd17abec9f32798a1f1e22d\``);
        await queryRunner.query(`DROP TABLE \`notification_entity\``);
    }

}
