import { AuthModule } from '@application/di/AuthModule';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from './ConfigurationModule';

@Module({
  imports: [
    ConfigurationModule,
    InfrastructureModule,
    AuthModule,
  ]
})
export class RootModule {}
