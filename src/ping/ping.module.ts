import { Module } from '@nestjs/common';
import { PingResolver } from './ping.resolver';
import { PingService } from './ping.service';

@Module({
  providers: [PingService, PingResolver],
})
export class PingModule {}
