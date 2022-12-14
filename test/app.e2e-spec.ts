import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
