import { Injectable } from '@nestjs/common';
import { RequestLoggerService } from '../request-logger/request-logger.service';

@Injectable()
export class PingService {
  constructor(private readonly requestLogger: RequestLoggerService) {}

  call(): string {
    this.requestLogger.log('PingService call() LOG ...');
    this.requestLogger.warn('PingService call() WARN ...');
    this.requestLogger.error('PingService call() ERROR ...');
    return 'pong';
  }
}
