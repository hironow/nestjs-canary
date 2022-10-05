import { Test, TestingModule } from '@nestjs/testing';
import { PingResolver } from './ping.resolver';
import { WinstonModule } from 'nest-winston';
import { PingService } from './ping.service';

describe('PingResolver', () => {
  let resolver: PingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({ silent: true })],
      providers: [PingService, PingResolver],
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
