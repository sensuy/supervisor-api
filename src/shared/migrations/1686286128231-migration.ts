import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1686286128231 implements MigrationInterface {
    name = 'Migration1686286128231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "active" text NOT NULL DEFAULT true`);
    }

}
