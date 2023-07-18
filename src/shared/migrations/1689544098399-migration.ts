import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1689544098399 implements MigrationInterface {
    name = 'Migration1689544098399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."permission_type_enum" AS ENUM('FRANCHISE', 'SCHOOL')`);
        await queryRunner.query(`CREATE TABLE "permission" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "permissionid" character varying NOT NULL, "label" text NOT NULL, "type" "public"."permission_type_enum" NOT NULL, CONSTRAINT "PK_df33f56bef6c8059ccbc35ead03" PRIMARY KEY ("permissionid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TYPE "public"."permission_type_enum"`);
    }

}
