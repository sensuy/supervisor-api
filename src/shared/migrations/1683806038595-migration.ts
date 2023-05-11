import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683806038595 implements MigrationInterface {
    name = 'Migration1683806038595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted" text NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted"`);
    }

}
