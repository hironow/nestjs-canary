import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import * as lw from '@google-cloud/logging-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const logger = app.get(WINSTON_MODULE_PROVIDER);
  const mw = await lw.express.makeMiddleware(logger, {
    redirectToStdout: true,
  });
  app.use(mw);

  await app.listen(3000);
}
bootstrap();
