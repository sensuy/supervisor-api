import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683837015276 implements MigrationInterface {
    name = 'Migration1683837015276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted" text NOT NULL DEFAULT false`);
    }

}
