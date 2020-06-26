import {MigrationInterface, QueryRunner} from "typeorm";

export class User1593144603660 implements MigrationInterface {
    name = 'User1593144603660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `fullname` varchar(255) NOT NULL, `contact_number` varchar(255) NOT NULL, `date_of_birth` date NULL, `gender` enum ('MALE', 'FEMALE') NOT NULL, `role` enum ('TENANT_ADMIN', 'PLATFORM_USER') NOT NULL DEFAULT 'PLATFORM_USER', UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
