import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683737145199 implements MigrationInterface {
    name = 'Migration1683737145199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" DROP DEFAULT`);
    }

}
