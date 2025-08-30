import type { NextFunction, Request, Response } from 'express'
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class TestingLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('TestingMiddleware')
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method} ${req.originalUrl}`)
    next()
  }
}
