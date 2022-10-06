import { Injectable } from '@nestjs/common';
import { RequestLoggerService } from './request-logger/request-logger.service';

@Injectable()
export class AppService {
  constructor(private readonly requestLogger: RequestLoggerService) {}

  getHello(): string {
    this.requestLogger.log('AppService / this is INFO log');
    this.requestLogger.warn('AppService / this is WARN log');
    this.requestLogger.error('AppService / this is ERROR log');
    return 'Hello World!';
  }
}
