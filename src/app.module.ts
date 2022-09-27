import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [WinstonModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
