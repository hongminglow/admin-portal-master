import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTable2001755673584172 implements MigrationInterface {
  name = 'UpdateTable2001755673584172'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint first, then the index
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` DROP FOREIGN KEY \`FK_d68ea74fcb041c8cfd1fd659844\``)
    await queryRunner.query(`DROP INDEX \`FK_d68ea74fcb041c8cfd1fd659844\` ON \`sys_dict_item\``)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recreate the index first, then the foreign key constraint
    await queryRunner.query(`CREATE INDEX \`FK_d68ea74fcb041c8cfd1fd659844\` ON \`sys_dict_item\` (\`type_id\`)`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` ADD CONSTRAINT \`FK_d68ea74fcb041c8cfd1fd659844\` FOREIGN KEY (\`type_id\`) REFERENCES \`sys_dict_type\`(\`id\`) ON DELETE CASCADE`)
  }
}
