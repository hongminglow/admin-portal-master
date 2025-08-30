import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { UserEntity } from '~/modules/user/user.entity'

@Entity({ name: 'sys_test' })
export class TestingEntity extends CommonEntity {
  @Column({ unique: true })
  nickname: string

  @Column({ type: 'tinyint', unsigned: true })
  age: number

  @Column({ type: 'text', nullable: true })
  address: string

  @Column({ nullable: true })
  email: string

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>

  @Column({ nullable: true, type: 'tinyint' })
  status: number
}
