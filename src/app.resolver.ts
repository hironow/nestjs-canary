import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Resolver()
export class AppResolver {
  private readonly logger = new Logger(AppResolver.name);

  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  sayHello(): string {
    this.logger.debug('AppResolver / this is DEBUG log');
    this.logger.log('AppResolver / this is INFO log');
    this.logger.warn('AppResolver / this is WARN log');
    this.logger.error('AppResolver / this is ERROR log');
    return this.appService.getHello();
  }
}
