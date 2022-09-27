import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as winston from 'winston';
import * as lw from '@google-cloud/logging-winston';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    // cloud logging winston middleware
    const logger = winston.createLogger();
    const mw = await lw.express.makeMiddleware(logger, {
      redirectToStdout: true,
    });
    consumer.apply(mw).forRoutes('/');
  }
}
