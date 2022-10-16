import * as lw from '@google-cloud/logging-winston';
import * as winston from 'winston';

export const createWinstonAccessLogger = (level: string, silent?: boolean) =>
  winston.createLogger({
    silent: silent,
    level: level,
    defaultMeta: lw.getDefaultMetadataForTracing(),
    transports: [],
  });
