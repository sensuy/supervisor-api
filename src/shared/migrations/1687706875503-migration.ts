import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1687706875503 implements MigrationInterface {
    name = 'Migration1687706875503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "fk_idfranchise" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "fk_idschool" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "fk_idschool" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "fk_idfranchise" SET NOT NULL`);
    }

}
