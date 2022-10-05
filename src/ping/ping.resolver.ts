import { Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PingService } from './ping.service';

@Resolver()
export class PingResolver {
  private readonly logger = new Logger(PingService.name);

  constructor(private readonly pingService: PingService) {}

  @Query(() => String)
  ping(): string {
    this.logger.log('PingResolver ping()...');
    return this.pingService.call();
  }
}
