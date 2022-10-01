import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';

describe('AppResolver', () => {
  let appResolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRoot({ silent: true }),
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
      providers: [AppService, AppResolver],
    }).compile();

    appResolver = app.get<AppResolver>(AppResolver);
  });

  describe('Query sayHello', () => {
    it('should return "Hello World!"', () => {
      expect(appResolver.sayHello()).toBe('Hello World!');
    });
  });
});
