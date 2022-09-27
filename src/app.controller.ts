import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.debug('AppController / this is DEBUG log');
    this.logger.info('AppController / this is INFO log');
    this.logger.warn('AppController / this is WARN log');
    this.logger.error('AppController / this is ERROR log');

    return this.appService.getHello();
  }
}
