import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  getHello(): string {
    this.logger.debug('AppService / this is DEBUG log');
    this.logger.info('AppService / this is INFO log');
    this.logger.warn('AppService / this is WARN log');
    this.logger.error('AppService / this is ERROR log');

    return 'Hello World!';
  }
}
