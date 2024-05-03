import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@core/domain/user/entity/User';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { MongooseUserRepositoryAdapter } from '@infrastructure/adapter/persistence/mongoose/repository/MongooseUserRepositoryAdapter';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { HandleGetUserPreviewQueryService } from '@core/service/user/handler/HandleGetUserPreviewQueryService';
import { NestWrapperGetUserPreviewQueryHandler } from '@infrastructure/handler/user/NestWrapperGetUserPreviewQueryHandler';
import { UserController } from '@application/api/controller/UserController';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';

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
];

const handlerProviders: Provider[] = [
  NestWrapperGetUserPreviewQueryHandler,
  {
    provide: UserDITokens.GetUserPreviewQueryHandler,
    useFactory: (userRepository: UserRepositoryPort) => new HandleGetUserPreviewQueryService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];

const handleRepository: Provider[] = [
  { provide: UserDITokens.UserRepository, useClass: MongooseUserRepositoryAdapter }
]

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    ...useCaseProviders,
    ...handlerProviders,
    ...handleRepository,
  ],
  exports: [UserDITokens.UserRepository],
})
export class UserModule {}
