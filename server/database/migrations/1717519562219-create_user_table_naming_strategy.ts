import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTableNamingStrategy1717519562219 implements MigrationInterface {
    name = 'CreateUserTableNamingStrategy1717519562219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" int NOT NULL IDENTITY(1,1), "first_name" nvarchar(255) NOT NULL, "last_name" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "status" int NOT NULL CONSTRAINT "DF_e99721daeabe7943e43b1dfac06" DEFAULT 1, "refresh_token" nvarchar(255) NOT NULL, "created_on" datetime2 NOT NULL CONSTRAINT "DF_64cde55db79215cbe4f2c042a9f" DEFAULT getdate(), "updated_on" datetime2 NOT NULL CONSTRAINT "DF_a0a448995eef65fa572a9ae7758" DEFAULT getdate(), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
