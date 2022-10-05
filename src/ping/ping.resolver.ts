import { Query, Resolver } from '@nestjs/graphql';
import { PingService } from './ping.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

@Resolver()
export class PingResolver {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly pingService: PingService,
  ) {}

  @Query(() => String)
  ping(): string {
    return this.pingService.call();
  }
}
