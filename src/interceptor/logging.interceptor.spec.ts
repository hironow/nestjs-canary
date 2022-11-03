import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { createWinstonAccessLogger } from '../access-logger';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  const executionContext = createMock<ExecutionContext>();
  const interceptor = new LoggingInterceptor(createWinstonAccessLogger('info'));

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept', () => {
    it('success', async () => {
      // arrange
      const someData = {};

      const callHandler = {
        handle() {
          return of(someData);
        },
      };

      // act
      interceptor
        .intercept(executionContext, callHandler)
        .subscribe((asyncData) => {
          // asset
          expect(asyncData).toEqual({
            data: { ...someData },
          });
        });
    });
  });
});
