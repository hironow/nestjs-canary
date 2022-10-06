import { Module } from '@nestjs/common';
import { RequestLoggerModule } from '../request-logger/request-logger.module';
import { PingResolver } from './ping.resolver';
import { PingService } from './ping.service';

@Module({
  imports: [RequestLoggerModule],
  providers: [PingService, PingResolver],
  exports: [PingService, PingResolver],
})
export class PingModule {}
