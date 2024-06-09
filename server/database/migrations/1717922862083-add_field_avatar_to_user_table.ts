import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldAvatarToUserTable1717922862083 implements MigrationInterface {
    name = 'AddFieldAvatarToUserTable1717922862083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "avatar" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "refresh_token" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "refresh_token" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "avatar"`);
    }

}
