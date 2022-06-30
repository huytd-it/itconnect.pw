import { MigrationInterface, QueryRunner } from "typeorm";

export class mg1656605664891 implements MigrationInterface {
    name = 'mg1656605664891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`point_config_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`point\` int NOT NULL, UNIQUE INDEX \`IDX_79fd332acb8f361ae5b2986d4c\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_79fd332acb8f361ae5b2986d4c\` ON \`point_config_entity\``);
        await queryRunner.query(`DROP TABLE \`point_config_entity\``);
    }

}
