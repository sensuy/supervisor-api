import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1689898299087 implements MigrationInterface {
    name = 'Migration1689898299087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_7b45f3f21cce94e7d796b115cd1"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "PK_383892d758d08d346f837d3d8b7"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "PK_1c22e03c6388eab005bb8292794" PRIMARY KEY ("fk_roleid", "fk_permissionid")`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_67f3962eab1411f9a46aed44aa5"`);
        await queryRunner.query(`ALTER TABLE "permission_role" ALTER COLUMN "fk_roleid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission_role" ALTER COLUMN "fk_permissionid" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_7b45f3f21cce94e7d796b115cd" ON "permission_role" ("fk_roleid") `);
        await queryRunner.query(`CREATE INDEX "IDX_67f3962eab1411f9a46aed44aa" ON "permission_role" ("fk_permissionid") `);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_7b45f3f21cce94e7d796b115cd1" FOREIGN KEY ("fk_roleid") REFERENCES "role"("roleid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_67f3962eab1411f9a46aed44aa5" FOREIGN KEY ("fk_permissionid") REFERENCES "permission"("permissionid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_67f3962eab1411f9a46aed44aa5"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_7b45f3f21cce94e7d796b115cd1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67f3962eab1411f9a46aed44aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b45f3f21cce94e7d796b115cd"`);
        await queryRunner.query(`ALTER TABLE "permission_role" ALTER COLUMN "fk_permissionid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission_role" ALTER COLUMN "fk_roleid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_67f3962eab1411f9a46aed44aa5" FOREIGN KEY ("fk_permissionid") REFERENCES "permission"("permissionid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "PK_1c22e03c6388eab005bb8292794"`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "PK_383892d758d08d346f837d3d8b7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_7b45f3f21cce94e7d796b115cd1" FOREIGN KEY ("fk_roleid") REFERENCES "role"("roleid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
