import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import * as lw from '@google-cloud/logging-winston';
import { RequestInterceptor } from './interceptor/request.interceptor';

import * as TraceAgent from '@google-cloud/trace-agent';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  TraceAgent.start({
    samplingRate: 5,
    ignoreMethods: ['options'],
  });

  const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(winstonLogger);

  const logger = app.get(WINSTON_MODULE_PROVIDER);
  const mw = await lw.express.makeMiddleware(logger, {
    projectId: process.env.GCP_PROJECT_ID || 'test',
  });
  app.use(mw);

  app.useGlobalInterceptors(new RequestInterceptor());

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
