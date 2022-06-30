import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656604168075 implements MigrationInterface {
    name = 'mg1656604168075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`point_job_user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pointTotal\` int NOT NULL, \`pointSkill\` int NOT NULL, \`pointPosition\` int NOT NULL, \`pointCertificate\` int NOT NULL, \`pointSchool\` int NOT NULL, \`pointWorkFrom\` int NOT NULL, \`pointLevelJob\` int NOT NULL, \`pointLevelType\` int NOT NULL, \`pointYoe\` int NOT NULL, \`userId\` int NULL, \`jobId\` int NULL, UNIQUE INDEX \`IDX_f26d7ebea52ec2419fbd0b714d\` (\`jobId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`point_job_user_entity\` ADD CONSTRAINT \`FK_f4caeaff097ca17dd9d1f0e26d9\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`point_job_user_entity\` ADD CONSTRAINT \`FK_d00315cb31539bdd6014f2d82b6\` FOREIGN KEY (\`jobId\`) REFERENCES \`job_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_job_user_entity\` DROP FOREIGN KEY \`FK_d00315cb31539bdd6014f2d82b6\``);
        await queryRunner.query(`ALTER TABLE \`point_job_user_entity\` DROP FOREIGN KEY \`FK_f4caeaff097ca17dd9d1f0e26d9\``);
        await queryRunner.query(`DROP INDEX \`IDX_f26d7ebea52ec2419fbd0b714d\` ON \`point_job_user_entity\``);
        await queryRunner.query(`DROP TABLE \`point_job_user_entity\``);
    }

}
