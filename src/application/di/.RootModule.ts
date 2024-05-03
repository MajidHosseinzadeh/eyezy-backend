import { AuthModule } from '@application/di/AuthModule';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { UserModule } from '@application/di/UserModule';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from './ConfigurationModule';

@Module({
  imports: [
    ConfigurationModule,
    InfrastructureModule,
    AuthModule,
    UserModule,
  ]
})
export class RootModule {}
