import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  call(): string {
    this.logger.log('PingService call()...');
    return 'pong';
  }
}
