import * as lw from '@google-cloud/logging-winston';
import * as winston from 'winston';

export const createWinstonAccessLogger = () =>
  winston.createLogger({
    level: 'debug',
    defaultMeta: lw.getDefaultMetadataForTracing(),
    transports: [],
  });
