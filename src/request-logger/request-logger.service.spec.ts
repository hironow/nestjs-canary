import { Test, TestingModule } from '@nestjs/testing';

import { GlobalConfigModule } from '../global-config/global-config.module';

import { RequestLoggerModule } from './request-logger.module';
import { RequestLoggerService } from './request-logger.service';

describe('RequestLoggerService', () => {
  let service: RequestLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RequestLoggerModule, GlobalConfigModule],
      providers: [RequestLoggerService],
    }).compile();

    service = await module.resolve<RequestLoggerService>(RequestLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('log', () => {
    it('should call with undefined', () => {
      expect(service.log('test')).toBeUndefined();
    });
  });
});
