import { createMock } from '@golevelup/ts-jest';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { RequestInterceptor } from './request.interceptor';

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;

  beforeEach(() => {
    interceptor = new RequestInterceptor();
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