import { Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly appService: AppService,
  ) {}

  @Query(() => String)
  sayHello(): string {
    this.logger.debug('AppResolver / this is DEBUG log');
    this.logger.info('AppResolver / this is INFO log');
    this.logger.warn('AppResolver / this is WARN log');
    this.logger.error('AppResolver / this is ERROR log');

    return this.appService.getHello();
  }
}
