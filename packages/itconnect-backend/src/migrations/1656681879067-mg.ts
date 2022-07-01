import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656681879067 implements MigrationInterface {
    name = 'mg1656681879067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_1bb9f051011a9be0d21397a400\` ON \`point_job_user_entity\` (\`pointTotal\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_e2127aa5b4fc1507129970515c\` ON \`point_job_user_entity\` (\`userId\`, \`pointTotal\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_590473d3447c2fc085cdf14d1f\` ON \`point_job_user_entity\` (\`jobId\`, \`pointTotal\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_590473d3447c2fc085cdf14d1f\` ON \`point_job_user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2127aa5b4fc1507129970515c\` ON \`point_job_user_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_1bb9f051011a9be0d21397a400\` ON \`point_job_user_entity\``);
    }

}
