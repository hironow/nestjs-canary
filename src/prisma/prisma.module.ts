import { Module } from '@nestjs/common';
import { RequestLoggerModule } from '../request-logger/request-logger.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [RequestLoggerModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
