import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656878234079 implements MigrationInterface {
    name = 'mg1656878234079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`job_view_log_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`jobId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`job_view_log_entity\` ADD CONSTRAINT \`FK_cb2b65172c13c5b94da5cf4381c\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_view_log_entity\` ADD CONSTRAINT \`FK_53b3c7a412e8669702f7c5d8580\` FOREIGN KEY (\`jobId\`) REFERENCES \`job_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_view_log_entity\` DROP FOREIGN KEY \`FK_53b3c7a412e8669702f7c5d8580\``);
        await queryRunner.query(`ALTER TABLE \`job_view_log_entity\` DROP FOREIGN KEY \`FK_cb2b65172c13c5b94da5cf4381c\``);
        await queryRunner.query(`DROP TABLE \`job_view_log_entity\``);
    }

}
