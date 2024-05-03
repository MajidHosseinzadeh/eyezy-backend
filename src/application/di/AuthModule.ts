import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@application/api/controller/AuthController';
import { UserModule } from '@application/di/UserModule';
import { HttpAuthService } from '@application/api/auth/HttpAuthService';
import { HttpJwtStrategy } from '@application/api/auth/passport/HttpJwtStrategy';
import { HttpLocalStrategy } from '@application/api/auth/passport/HttpLocalStrategy';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { ConfigurationModule } from './ConfigurationModule';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@core/domain/user/entity/User';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { MongooseUserRepositoryAdapter } from '@infrastructure/adapter/persistence/mongoose/repository/MongooseUserRepositoryAdapter';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  providers: [HttpAuthService, HttpLocalStrategy, HttpJwtStrategy, { provide: UserDITokens.UserRepository, useClass: MongooseUserRepositoryAdapter }],
  exports: [UserDITokens.UserRepository],
})
export class AuthModule {}
