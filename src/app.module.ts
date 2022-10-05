import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { PingModule } from './ping/ping.module';
import { AppController } from './app.controller';
import * as lw from '@google-cloud/logging-winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      defaultMeta: lw.getDefaultMetadataForTracing(),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'generated/graphql/schema.gql'),
      sortSchema: true,
      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // use apollo sandbox
    }),
    PingModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
