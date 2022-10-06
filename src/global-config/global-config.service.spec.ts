import { Test, TestingModule } from '@nestjs/testing';
import { GlobalConfigService } from './global-config.service';
import { ConfigModule } from '@nestjs/config';
import { generateGlobalConfig } from './configuration';

describe('GlobalConfigService', () => {
  let service: GlobalConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [generateGlobalConfig],
        }),
      ],
      providers: [GlobalConfigService],
      exports: [GlobalConfigService],
    }).compile();

    service = await module.resolve<GlobalConfigService>(GlobalConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('call', () => {
      expect(service.get('gcp.projectId')).toBe('test');
    });
  });
});
