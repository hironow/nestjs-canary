import { Query, Resolver } from '@nestjs/graphql';
import { RequestLoggerService } from '../request-logger/request-logger.service';
import { PingService } from './ping.service';

@Resolver()
export class PingResolver {
  constructor(
    private readonly requestLogger: RequestLoggerService,
    private readonly pingService: PingService,
  ) {}

  @Query(() => String)
  ping(): string {
    this.requestLogger.log('PingResolver ping()...');
    return this.pingService.call();
  }
}
