import { MigrationInterface, QueryRunner } from 'typeorm'

export class TestingEntity1755874051966 implements MigrationInterface {
  name = 'TestingEntity1755874051966'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`FK_d68ea74fcb041c8cfd1fd659844\` ON \`sys_dict_item\``)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX \`FK_d68ea74fcb041c8cfd1fd659844\` ON \`sys_dict_item\` (\`type_id\`)`)
  }
}
