import { Test, TestingModule } from '@nestjs/testing';
import { RequestLoggerService } from '../request-logger/request-logger.service';
import { createMock } from '@golevelup/ts-jest';

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: RequestLoggerService,
          useValue: createMock<RequestLoggerService>(),
        },
      ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
