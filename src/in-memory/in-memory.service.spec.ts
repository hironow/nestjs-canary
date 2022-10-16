import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryService } from './in-memory.service';
import { RequestLoggerService } from '../request-logger/request-logger.service';
import { createMock } from '@golevelup/ts-jest';

describe('InMemoryService', () => {
  let service: InMemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InMemoryService,
        {
          provide: RequestLoggerService,
          useValue: createMock<RequestLoggerService>(),
        },
      ],
    }).compile();

    service = module.get<InMemoryService>(InMemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
