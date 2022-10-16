import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { RequestLoggerService } from './request-logger/request-logger.service';
import { errorSayGoodnight } from './error';

describe('AppResolver', () => {
  let resolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'generated/graphql/schema.gql'),
          sortSchema: true,
          debug: true,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()], // use apollo sandbox
        }),
      ],
      controllers: [],
      providers: [
        AppService,
        AppResolver,
        {
          provide: RequestLoggerService,
          useValue: createMock<RequestLoggerService>(),
        },
      ],
    }).compile();

    resolver = app.get<AppResolver>(AppResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Query sayHello', () => {
    it('should return "Hello World!"', () => {
      expect(resolver.sayHello()).toBe('Hello World!');
    });
  });

  describe('Query sayGoodnight', () => {
    it('should return throw error', () => {
      expect(() => resolver.sayGoodnight()).toThrowError(errorSayGoodnight());
    });
  });
});
