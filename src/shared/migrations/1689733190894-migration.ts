import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1689733190894 implements MigrationInterface {
    name = 'Migration1689733190894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission_role" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "fk_permissionid" character varying, "fk_roleid" integer, CONSTRAINT "PK_383892d758d08d346f837d3d8b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_67f3962eab1411f9a46aed44aa5" FOREIGN KEY ("fk_permissionid") REFERENCES "permission"("permissionid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_7b45f3f21cce94e7d796b115cd1" FOREIGN KEY ("fk_roleid") REFERENCES "role"("roleid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_7b45f3f21cce94e7d796b115cd1"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_67f3962eab1411f9a46aed44aa5"`);
        await queryRunner.query(`DROP TABLE "permission_role"`);
    }

}
