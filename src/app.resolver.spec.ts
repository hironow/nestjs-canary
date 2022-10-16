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
  let appResolver: AppResolver;

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

    appResolver = app.get<AppResolver>(AppResolver);
  });

  describe('Query sayHello', () => {
    it('should return "Hello World!"', () => {
      expect(appResolver.sayHello()).toBe('Hello World!');
    });
  });

  describe('Query sayGoodnight', () => {
    it('should return throw error', () => {
      expect(() => appResolver.sayGoodnight()).toThrowError(
        errorSayGoodnight(),
      );
    });
  });
});
