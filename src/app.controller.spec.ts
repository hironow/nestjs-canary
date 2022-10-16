import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggerService } from './request-logger/request-logger.service';
import { errorSayGoodnight } from './error';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: RequestLoggerService,
          useValue: createMock<RequestLoggerService>(),
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/ (root)', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('/error', () => {
    it('should return throw error', () => {
      expect(() => appController.sayGoodnight()).toThrowError(
        errorSayGoodnight(),
      );
    });
  });
});
