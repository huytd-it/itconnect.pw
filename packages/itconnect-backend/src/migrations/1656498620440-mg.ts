import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656498620440 implements MigrationInterface {
    name = 'mg1656498620440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`job_saved_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`jobId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_apply_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`jobId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`job_saved_entity\` ADD CONSTRAINT \`FK_8ae82209db90cb78030a0a95cb8\` FOREIGN KEY (\`jobId\`) REFERENCES \`job_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_saved_entity\` ADD CONSTRAINT \`FK_6337aca865f6c5cae260005fb78\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_apply_entity\` ADD CONSTRAINT \`FK_b7b9bd039c470ab31f5dfe166a9\` FOREIGN KEY (\`jobId\`) REFERENCES \`job_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_apply_entity\` ADD CONSTRAINT \`FK_e1979066c79fbe6747feeceaa92\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_apply_entity\` DROP FOREIGN KEY \`FK_e1979066c79fbe6747feeceaa92\``);
        await queryRunner.query(`ALTER TABLE \`job_apply_entity\` DROP FOREIGN KEY \`FK_b7b9bd039c470ab31f5dfe166a9\``);
        await queryRunner.query(`ALTER TABLE \`job_saved_entity\` DROP FOREIGN KEY \`FK_6337aca865f6c5cae260005fb78\``);
        await queryRunner.query(`ALTER TABLE \`job_saved_entity\` DROP FOREIGN KEY \`FK_8ae82209db90cb78030a0a95cb8\``);
        await queryRunner.query(`DROP TABLE \`job_apply_entity\``);
        await queryRunner.query(`DROP TABLE \`job_saved_entity\``);
    }

}
