import { Module } from '@nestjs/common';
import { RequestLoggerModule } from '../request-logger/request-logger.module';
import { InMemoryService } from './in-memory.service';

@Module({
  imports: [RequestLoggerModule],
  providers: [InMemoryService],
  exports: [InMemoryService],
})
export class InMemoryModule {}
