import * as lw from '@google-cloud/logging-winston';
import * as winston from 'winston';

export const createWinstonAccessLogger = (level: string) =>
  winston.createLogger({
    level: level,
    defaultMeta: lw.getDefaultMetadataForTracing(),
    transports: [],
  });
