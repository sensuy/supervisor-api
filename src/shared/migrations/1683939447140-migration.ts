import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683939447140 implements MigrationInterface {
    name = 'Migration1683939447140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted" text NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "blocked" text NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "blocked"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted"`);
    }

}
