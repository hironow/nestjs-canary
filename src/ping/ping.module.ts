import { Module } from '@nestjs/common';
import { PingResolver } from './ping.resolver';
import { PingService } from './ping.service';

@Module({
  imports: [],
  providers: [PingService, PingResolver],
  exports: [PingService, PingResolver],
})
export class PingModule {}
