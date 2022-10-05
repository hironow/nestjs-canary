import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import * as lw from '@google-cloud/logging-winston';

import * as TraceAgent from '@google-cloud/trace-agent';

async function bootstrap() {
  TraceAgent.start({
    samplingRate: 5,
    ignoreMethods: ['options'],
  });

  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const logger = app.get(WINSTON_MODULE_PROVIDER);
  const mw = await lw.express.makeMiddleware(logger, {
    redirectToStdout: true,
  });
  app.use(mw);

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
