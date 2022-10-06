import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as lw from '@google-cloud/logging-winston';
import { createWinstonAccessLogger } from './access-logger';
import { GlobalConfigService } from './global-config/global-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use config for server spin-up
  const config = app.get<GlobalConfigService>(GlobalConfigService);

  // use winston as a access logger on cloud logging
  const winstonLogger = createWinstonAccessLogger();
  const mw = await lw.express.makeMiddleware(winstonLogger, {
    projectId: config.get('gcp.projectId'),
    redirectToStdout: true,
    inspectMetadata: true,
    useMessageField: true,
  });
  app.use(mw);

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
