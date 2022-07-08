import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1657281496624 implements MigrationInterface {
    name = 'mg1657281496624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification_entity\` DROP FOREIGN KEY \`FK_e7efdc6dc72ddd564ea44d40ff8\``);
        await queryRunner.query(`ALTER TABLE \`notification_entity\` ADD CONSTRAINT \`FK_e7efdc6dc72ddd564ea44d40ff8\` FOREIGN KEY (\`jobTargetId\`) REFERENCES \`job_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification_entity\` DROP FOREIGN KEY \`FK_e7efdc6dc72ddd564ea44d40ff8\``);
        await queryRunner.query(`ALTER TABLE \`notification_entity\` ADD CONSTRAINT \`FK_e7efdc6dc72ddd564ea44d40ff8\` FOREIGN KEY (\`jobTargetId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
