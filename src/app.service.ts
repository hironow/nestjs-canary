import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.debug('AppService / this is DEBUG log');
    this.logger.log('AppService / this is INFO log');
    this.logger.warn('AppService / this is WARN log');
    this.logger.error('AppService / this is ERROR log');
    return 'Hello World!';
  }
}
