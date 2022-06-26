import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656273346105 implements MigrationInterface {
    name = 'mg1656273346105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`job_type_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_6524197792f264cbd0434422b1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cv_work_experience_entity\` ADD \`jobTypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD \`jobTypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cv_work_experience_entity\` ADD CONSTRAINT \`FK_acc23afa977e185815ad59a79e0\` FOREIGN KEY (\`jobTypeId\`) REFERENCES \`job_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_entity\` ADD CONSTRAINT \`FK_d99de4cbce0121dfede76dd62a4\` FOREIGN KEY (\`jobTypeId\`) REFERENCES \`job_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP FOREIGN KEY \`FK_d99de4cbce0121dfede76dd62a4\``);
        await queryRunner.query(`ALTER TABLE \`cv_work_experience_entity\` DROP FOREIGN KEY \`FK_acc23afa977e185815ad59a79e0\``);
        await queryRunner.query(`ALTER TABLE \`job_entity\` DROP COLUMN \`jobTypeId\``);
        await queryRunner.query(`ALTER TABLE \`cv_work_experience_entity\` DROP COLUMN \`jobTypeId\``);
        await queryRunner.query(`DROP INDEX \`IDX_6524197792f264cbd0434422b1\` ON \`job_type_entity\``);
        await queryRunner.query(`DROP TABLE \`job_type_entity\``);
    }

}
