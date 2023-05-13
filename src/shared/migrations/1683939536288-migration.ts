import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683939536288 implements MigrationInterface {
    name = 'Migration1683939536288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "blocked"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "blocked" text NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted" text NOT NULL DEFAULT false`);
    }

}
