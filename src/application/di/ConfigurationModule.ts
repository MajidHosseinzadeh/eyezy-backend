import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { DatabaseConfig } from '@infrastructure/config/DatabaseConfig';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [ApiServerConfig, DatabaseConfig, ConfigService],
  exports: [ApiServerConfig, DatabaseConfig],
})
export class ConfigurationModule {}
