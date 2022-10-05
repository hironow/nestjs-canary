import { Test, TestingModule } from '@nestjs/testing';
import { PingService } from './ping.service';
import { WinstonModule } from 'nest-winston';

describe('PingService', () => {
  let service: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [PingService],
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
