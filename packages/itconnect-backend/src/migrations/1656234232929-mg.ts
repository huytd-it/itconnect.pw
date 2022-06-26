import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656234232929 implements MigrationInterface {
    name = 'mg1656234232929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_bd3ae16a1281da016b39e86fef\` ON \`job_level_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9ff15431d6b348f7b02f430d4\` ON \`work_from_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_5aa970b42f0a6ce72351658bd2\` ON \`position_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_f9600b0068f542043fc61430c8\` ON \`skill_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_c153fa4cf5a2c086bc453a034b\` ON \`school_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee4950f4e4c1764b45288bd631\` ON \`certificate_entity\``);
        await queryRunner.query(`ALTER TABLE \`job_level_entity\` ADD UNIQUE INDEX \`IDX_bd3ae16a1281da016b39e86fef\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`work_from_entity\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`work_from_entity\` ADD UNIQUE INDEX \`IDX_b9ff15431d6b348f7b02f430d4\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`position_entity\` ADD UNIQUE INDEX \`IDX_5aa970b42f0a6ce72351658bd2\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` ADD UNIQUE INDEX \`IDX_f9600b0068f542043fc61430c8\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`ranked_academic_entity\` ADD UNIQUE INDEX \`IDX_7249094a488abcd488f73befca\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`school_entity\` ADD UNIQUE INDEX \`IDX_c153fa4cf5a2c086bc453a034b\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`certificate_entity\` ADD UNIQUE INDEX \`IDX_ee4950f4e4c1764b45288bd631\` (\`name\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_c16579451d5866cfa86ea57f15\` ON \`job_entity\` (\`salaryMin\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_45c3cae8ac326b522e72f292b4\` ON \`job_entity\` (\`salaryMax\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_5cb6eb8f946bab768a80680c24\` ON \`job_entity\` (\`yoe\`)`);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_645a80b970f40765bd975fcc17\` ON \`job_entity\` (\`name\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_78b154c51bc15bcc84dd382c26\` ON \`job_entity\` (\`endDate\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_70754da45189b1fa68562bf27a\` ON \`job_entity\` (\`status\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_70754da45189b1fa68562bf27a\` ON \`job_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_78b154c51bc15bcc84dd382c26\` ON \`job_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_645a80b970f40765bd975fcc17\` ON \`job_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_5cb6eb8f946bab768a80680c24\` ON \`job_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_45c3cae8ac326b522e72f292b4\` ON \`job_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_c16579451d5866cfa86ea57f15\` ON \`job_entity\``);
        await queryRunner.query(`ALTER TABLE \`certificate_entity\` DROP INDEX \`IDX_ee4950f4e4c1764b45288bd631\``);
        await queryRunner.query(`ALTER TABLE \`school_entity\` DROP INDEX \`IDX_c153fa4cf5a2c086bc453a034b\``);
        await queryRunner.query(`ALTER TABLE \`ranked_academic_entity\` DROP INDEX \`IDX_7249094a488abcd488f73befca\``);
        await queryRunner.query(`ALTER TABLE \`skill_entity\` DROP INDEX \`IDX_f9600b0068f542043fc61430c8\``);
        await queryRunner.query(`ALTER TABLE \`position_entity\` DROP INDEX \`IDX_5aa970b42f0a6ce72351658bd2\``);
        await queryRunner.query(`ALTER TABLE \`work_from_entity\` DROP INDEX \`IDX_b9ff15431d6b348f7b02f430d4\``);
        await queryRunner.query(`ALTER TABLE \`work_from_entity\` CHANGE \`name\` \`name\` varchar(255) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`job_level_entity\` DROP INDEX \`IDX_bd3ae16a1281da016b39e86fef\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ee4950f4e4c1764b45288bd631\` ON \`certificate_entity\` (\`name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c153fa4cf5a2c086bc453a034b\` ON \`school_entity\` (\`name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f9600b0068f542043fc61430c8\` ON \`skill_entity\` (\`name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5aa970b42f0a6ce72351658bd2\` ON \`position_entity\` (\`name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b9ff15431d6b348f7b02f430d4\` ON \`work_from_entity\` (\`name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_bd3ae16a1281da016b39e86fef\` ON \`job_level_entity\` (\`name\`)`);
    }

}
