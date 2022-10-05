import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  WinstonModule,
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import * as lw from '@google-cloud/logging-winston';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, WinstonModule.forRoot({})],
    }).compile();

    // using middleware on main.ts
    app = moduleFixture.createNestApplication();
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    const logger = app.get(WINSTON_MODULE_PROVIDER);
    const mw = await lw.express.makeMiddleware(logger, {
      redirectToStdout: true,
    });
    app.use(mw);

    await app.init();
  });

  const gql = '/graphql';

  it('Query sayHello', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: 'query Query {\n  sayHello\n}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.sayHello).toEqual('Hello World!');
      });
  });

  it('Query ping', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: 'query Query {\n  ping\n}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.ping).toEqual('pong');
      });
  });
});
