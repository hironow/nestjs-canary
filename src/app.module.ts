import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { PingModule } from './ping/ping.module';
import { AppController } from './app.controller';
import { RequestLoggerModule } from './request-logger/request-logger.module';
import { GlobalConfigModule } from './global-config/global-config.module';

@Module({
  imports: [
    GlobalConfigModule,
    RequestLoggerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'generated/graphql/schema.gql'),
      sortSchema: true,
      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // use apollo sandbox
      context: ({ req, res }) => ({ req, res }), // use interceptor for graphql see: https://github.com/nestjs/graphql/issues/245#issuecomment-492595369
    }),
    PingModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
