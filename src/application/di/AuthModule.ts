import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@application/api/controller/AuthController';
import { HttpAuthService } from '@application/api/auth/HttpAuthService';
import { HttpJwtStrategy } from '@application/api/auth/passport/HttpJwtStrategy';
import { HttpLocalStrategy } from '@application/api/auth/passport/HttpLocalStrategy';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { ConfigurationModule } from './ConfigurationModule';
import { Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@core/domain/user/entity/User';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { MongooseUserRepositoryAdapter } from '@infrastructure/adapter/persistence/mongoose/entity/user/repository/MongooseUserRepositoryAdapter';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { HandleGetUserPreviewQueryService } from '@core/service/user/handler/HandleGetUserPreviewQueryService';
import { NestWrapperGetUserPreviewQueryHandler } from '@infrastructure/handler/user/NestWrapperGetUserPreviewQueryHandler';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { OtpDITokens } from '@core/domain/otp/di/OtpDITokens';
import { OtpRepositoryPort } from '@core/domain/otp/port/persistence/OtpRepositoryPort';
import { CreateOtpService } from '@core/service/otp/usecase/CreateOtpService';
import { MongooseOtpRepositoryAdapter } from '@infrastructure/adapter/persistence/mongoose/entity/otp/repository/MongooseOtpRepositoryAdapter';
import { Otp, OtpSchema } from '@core/domain/otp/entity/Otp';

const useCaseProviders: Provider[] = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new CreateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.GetUserUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new GetUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: OtpDITokens.CreateOtpUseCase,
    useFactory: (otpRepository: OtpRepositoryPort) => new CreateOtpService(otpRepository),
    inject: [OtpDITokens.OtpRepository],
  },
];

const handlerProviders: Provider[] = [
  NestWrapperGetUserPreviewQueryHandler,
  {
    provide: UserDITokens.GetUserPreviewQueryHandler,
    useFactory: (userRepository: UserRepositoryPort) => new HandleGetUserPreviewQueryService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];

const handleRepository: Provider[] = [{ provide: UserDITokens.UserRepository, useClass: MongooseUserRepositoryAdapter }, { provide: OtpDITokens.OtpRepository, useClass: MongooseOtpRepositoryAdapter }];

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Otp.name, schema: OtpSchema }]),
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
  ],
  controllers: [AuthController],
  providers: [HttpAuthService, HttpLocalStrategy, HttpJwtStrategy, ...useCaseProviders, ...handlerProviders, ...handleRepository],
  exports: [UserDITokens.UserRepository, OtpDITokens.OtpRepository],
})
export class AuthModule {}
