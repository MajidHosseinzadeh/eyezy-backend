import { Global, Module, OnApplicationBootstrap, Type } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { DatabaseConfig } from '@infrastructure/config/DatabaseConfig';
import { NestHttpExceptionFilter } from '@application/api/http-rest/exception-filter/NestHttpExceptionFilter';
import { NestHttpLoggingInterceptor } from '@application/api/http-rest/interceptor/NestHttpLoggingInterceptor';
import { CoreDITokens } from '@core/common/di/CoreDITokens';
import { NestCommandBusAdapter } from '@infrastructure/adapter/message/NestCommandBusAdapter';
import { NestEventBusAdapter } from '@infrastructure/adapter/message/NestEventBusAdapter';
import { NestQueryBusAdapter } from '@infrastructure/adapter/message/NestQueryBusAdapter';
import { CqrsModule } from '@nestjs/cqrs';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './ConfigurationModule';

const providers: Array<{ provide: any; useClass: Type<any> }> = [
  {
    provide: APP_FILTER,
    useClass: NestHttpExceptionFilter,
  },
  {
    provide: CoreDITokens.CommandBus,
    useClass: NestCommandBusAdapter,
  },
  {
    provide: CoreDITokens.QueryBus,
    useClass: NestQueryBusAdapter,
  },
  {
    provide: CoreDITokens.EventBus,
    useClass: NestEventBusAdapter,
  },
];

if ('ApiServerConfig.API_LOG_ENABLE') {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: NestHttpLoggingInterceptor,
  });
}

@Global()
@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [DatabaseConfig],
      useFactory: async (databaseConfig: DatabaseConfig) => {
        return {
          uri: databaseConfig.DB_URL.replace('<USERNAME>', databaseConfig.DB_USERNAME).replace('<PASSWORD>', databaseConfig?.DB_PASSWORD)?.replace('<HOST>', databaseConfig?.DB_HOST),
        };
      },
    }),
  ],
  providers: providers,
  exports: [CoreDITokens.CommandBus, CoreDITokens.QueryBus, CoreDITokens.EventBus],
})
export class InfrastructureModule {}
