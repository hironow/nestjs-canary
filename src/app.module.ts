import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
    }),
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
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
    AppResolver,
  ],
})
export class AppModule {}
