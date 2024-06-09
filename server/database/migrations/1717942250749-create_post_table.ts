import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1717942250749 implements MigrationInterface {
    name = 'CreatePostTable1717942250749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Post" ("id" int NOT NULL IDENTITY(1,1), "title" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "thumbnail" nvarchar(255) NOT NULL, "status" int NOT NULL CONSTRAINT "DF_a20dec4e74e25a36ec2525b7da7" DEFAULT 1, "created_on" datetime2 NOT NULL CONSTRAINT "DF_a7ef7542aa9856ce17954d30756" DEFAULT getdate(), "updated_on" datetime2 NOT NULL CONSTRAINT "DF_cb28bd5a0f74b44098f6ea45451" DEFAULT getdate(), "user_id" int, CONSTRAINT "PK_c4d3b3dcd73db0b0129ea829f9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Post" ADD CONSTRAINT "FK_b605b3716c40cd635b431e47b2b" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP CONSTRAINT "FK_b605b3716c40cd635b431e47b2b"`);
        await queryRunner.query(`DROP TABLE "Post"`);
    }

}
