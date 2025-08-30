import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TestingLoggingMiddleware } from '~/shared/middleware/logger-middleware'
import { UserModule } from '../user/user.module'
import { TestingController } from './testing.controller'
import { TestingEntity } from './testing.entity'
import { TestingService } from './testing.service'

const providers = [TestingService]
@Module({
  imports: [
    TypeOrmModule.forFeature([TestingEntity]),
    UserModule,
  ],
  controllers: [TestingController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class TestingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestingLoggingMiddleware).forRoutes(TestingController)
  }
}
