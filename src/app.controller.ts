import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestLoggerService } from './request-logger/request-logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly requestLogger: RequestLoggerService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.requestLogger.warn('AppController / this is WARN log');
    this.requestLogger.error('AppController / this is ERROR log');
    return this.appService.getHello();
  }
}
