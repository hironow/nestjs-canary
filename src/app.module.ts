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
import { PrismaModule } from './prisma/prisma.module';
import { InMemoryModule } from './in-memory/in-memory.module';

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
    }),
    PingModule,
    PrismaModule,
    InMemoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
