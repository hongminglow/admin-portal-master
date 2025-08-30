import { MigrationInterface, QueryRunner } from 'typeorm'

export class TestingEntity1755798748909 implements MigrationInterface {
  name = 'TestingEntity1755798748909'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` DROP FOREIGN KEY \`FK_d68ea74fcb041c8cfd1fd659844\``)
    await queryRunner.query(`CREATE TABLE \`sys_test\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nickname\` varchar(255) NOT NULL, \`age\` tinyint UNSIGNED NOT NULL, \`address\` text NULL, \`email\` varchar(255) NULL, \`status\` tinyint NULL, \`user_phone\` int NULL, UNIQUE INDEX \`IDX_7c424aba008e8ea75bda98613b\` (\`nickname\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`sys_dept\` ADD \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dept\` ADD \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` ADD \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` ADD \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_role\` ADD \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_role\` ADD \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`value\` \`value\` varchar(255) NOT NULL COMMENT '角色标识'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` CHANGE \`create_by\` \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` CHANGE \`update_by\` \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` CHANGE \`create_by\` \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` CHANGE \`update_by\` \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_test\` ADD CONSTRAINT \`FK_d5314f4d2d243d020f96c1c566f\` FOREIGN KEY (\`user_phone\`) REFERENCES \`sys_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_test\` DROP FOREIGN KEY \`FK_d5314f4d2d243d020f96c1c566f\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` CHANGE \`update_by\` \`update_by\` int NOT NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` CHANGE \`create_by\` \`create_by\` int NOT NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` CHANGE \`update_by\` \`update_by\` int NOT NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` CHANGE \`create_by\` \`create_by\` int NOT NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`value\` \`value\` varchar(255) NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`sys_role\` DROP COLUMN \`update_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_role\` DROP COLUMN \`create_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` DROP COLUMN \`update_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` DROP COLUMN \`create_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_dept\` DROP COLUMN \`update_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_dept\` DROP COLUMN \`create_by\``)
    await queryRunner.query(`DROP INDEX \`IDX_7c424aba008e8ea75bda98613b\` ON \`sys_test\``)
    await queryRunner.query(`DROP TABLE \`sys_test\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` ADD CONSTRAINT \`FK_d68ea74fcb041c8cfd1fd659844\` FOREIGN KEY (\`type_id\`) REFERENCES \`sys_dict_type\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`)
  }
}
