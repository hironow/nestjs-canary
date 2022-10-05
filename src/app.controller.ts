import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.debug('AppController / this is DEBUG log');
    this.logger.log('AppController / this is INFO log');
    this.logger.warn('AppController / this is WARN log');
    this.logger.error('AppController / this is ERROR log');
    return this.appService.getHello();
  }
}
