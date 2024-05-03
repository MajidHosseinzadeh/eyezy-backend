import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@application/api/http-rest/controller/AuthController';
import { UserModule } from '@application/di/UserModule';
import { HttpAuthService } from '@application/api/http-rest/auth/HttpAuthService';
import { HttpJwtStrategy } from '@application/api/http-rest/auth/passport/HttpJwtStrategy';
import { HttpLocalStrategy } from '@application/api/http-rest/auth/passport/HttpLocalStrategy';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { ConfigurationModule } from './ConfigurationModule';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ApiServerConfig],
      useFactory: async (apiConfig: ApiServerConfig) => {
        return {
          secret: apiConfig.API_ACCESS_TOKEN_SECRET,
          signOptions: { expiresIn: `${apiConfig.API_ACCESS_TOKEN_TTL_IN_MINUTES}m` },
        };
      },
    }),
    UserModule,
  ],

  controllers: [AuthController],
  providers: [HttpAuthService, HttpLocalStrategy, HttpJwtStrategy],
})
export class AuthModule {}
