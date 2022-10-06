import { Test, TestingModule } from '@nestjs/testing';
import { RequestLoggerService } from '../request-logger/request-logger.service';
import { createMock } from '@golevelup/ts-jest';

import { PingService } from './ping.service';
import { PingResolver } from './ping.resolver';

describe('PingResolver', () => {
  let resolver: PingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PingService,
        PingResolver,
        {
          provide: RequestLoggerService,
          useValue: createMock<RequestLoggerService>(),
        },
      ],
    }).compile();

    resolver = module.get<PingResolver>(PingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Query ping', () => {
    it('should return "pong"', () => {
      expect(resolver.ping()).toBe('pong');
    });
  });
});
