import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1690056637546 implements MigrationInterface {
    name = 'Migration1690056637546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authid" SERIAL NOT NULL, "fk_franchiseid" text NOT NULL, "fk_schoolid" text NOT NULL, "fk_userid" uuid, "fk_roleid" integer, CONSTRAINT "PK_b67a73464821c47102ac9405dc9" PRIMARY KEY ("authid"))`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_7849f71265d3d11914aa1a6460e" FOREIGN KEY ("fk_userid") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_60d4e64da5910e04e7a0d4a12c8" FOREIGN KEY ("fk_roleid") REFERENCES "role"("roleid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_60d4e64da5910e04e7a0d4a12c8"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_7849f71265d3d11914aa1a6460e"`);
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
