import { createMock } from '@golevelup/ts-jest';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
  });

  it('should has no effect with request', async () => {
    const context = createMock<ExecutionContext>();
    const handler = createMock<CallHandler>({
      handle: () => of('query Query {\n  sayHello\n}'),
    });
    // RxJS Observable
    const obs$ = interceptor.intercept(context, handler);
    obs$.subscribe({
      next: (val) => {
        expect(val).toEqual('query Query {\n  sayHello\n}');
      },
    });
  });
});
