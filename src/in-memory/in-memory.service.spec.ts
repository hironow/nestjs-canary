import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryService } from './in-memory.service';
import { WinstonModule } from 'nest-winston';

describe('InMemoryService', () => {
  let service: InMemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [InMemoryService],
    }).compile();

    service = module.get<InMemoryService>(InMemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
