import { Test, TestingModule } from '@nestjs/testing';
import { RequestLoggerService } from '../request-logger/request-logger.service';
import { createMock } from '@golevelup/ts-jest';

import { PingService } from './ping.service';

describe('PingService', () => {
  let service: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PingService,
        {
          provide: RequestLoggerService,
          useValue: createMock<RequestLoggerService>(),
        },
      ],
    }).compile();

    service = module.get<PingService>(PingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('call', () => {
    it('should return "pong"', () => {
      expect(service.call()).toBe('pong');
    });
  });
});
