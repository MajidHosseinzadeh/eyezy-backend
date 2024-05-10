import { HttpJwtPayload, HttpLoggedInUser, HttpUserPayload, HttpVerifyOTPPayload } from '@application/api/auth/type/HttpAuthTypes';
import { OtpStatus } from '@core/common/enums/OtpEnums';
import { UserRole } from '@core/common/enums/UserEnums';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { OtpDITokens } from '@core/domain/otp/di/OtpDITokens';
import { Otp, OtpModel } from '@core/domain/otp/entity/Otp';
import { CreateOtpUseCase } from '@core/domain/otp/usecase/CreateOtpUseCase';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { User, UserModel } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { MongooseOtpRepositoryAdapter } from '@infrastructure/adapter/persistence/mongoose/entity/otp/repository/MongooseOtpRepositoryAdapter';
import { MongooseUserRepositoryAdapter } from '@infrastructure/adapter/persistence/mongoose/entity/user/repository/MongooseUserRepositoryAdapter';
import { CreateOtpAdapter } from '@infrastructure/adapter/usecase/otp/CreateOtpAdapter';
import { RequestAccountAdapter } from '@infrastructure/adapter/usecase/user/RequestAccountAdapter';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types, model } from 'mongoose';
import { ObjectId } from 'typeorm';

@Injectable()
export class HttpAuthService {
  constructor(
    @Inject(UserDITokens.UserRepository)
    private userRepository: MongooseUserRepositoryAdapter,
    @Inject(OtpDITokens.OtpRepository)
    private otpRepository: MongooseOtpRepositoryAdapter,
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(UserDITokens.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,
    @Inject(OtpDITokens.CreateOtpUseCase)
    private readonly createOtpUseCase: CreateOtpUseCase,
    private readonly jwtService: JwtService
  ) {}

  public async behavior(phone: number, role: UserRole) {
    const user: UserUseCaseDto = await this.getUserUseCase.execute({phone});
    console.log(user)
    // const user = (await this.userRepository.findUser({ phone: phone })) || undefined;
    if (!user) {
      const adapter: RequestAccountAdapter = await RequestAccountAdapter.new({ phone: phone, role: UserRole.CUSTOMER });
      const createdUser = await this.createUserUseCase.execute(adapter);
      return await this.createOtp(createdUser.id);
    }
    if (user) return await this.createOtp(user.id);

    return null;
  }

  public async createOtp(user_id: Types.ObjectId) {
    const otp = (await this.otpRepository.findOne({ user_id: user_id, status: OtpStatus.ACTIVE, otp_expires: { $gt: Date.now() } })) || undefined;
    console.log(otp)
    if (!otp) {
      const otpAdapter: CreateOtpAdapter = await CreateOtpAdapter.new({ user_id });
      this.createOtpUseCase.execute(otpAdapter);
    }
    if(otp) console.log("exist")
  }

  public async verifyOTP(phone: number, otp: number): Promise<HttpLoggedInUser | null> {
    const user: Optional<User> = (await this.userRepository.findUser({ phone: phone })) || undefined;

    if (user) {
      const isOTPValid: boolean | null = await user.compareOTP(otp);
      if (isOTPValid) {
        return this.login({
          phone,
          otp,
          role: UserRole.CUSTOMER,
        });
      }
    }

    return null;
  }

  public login(user: HttpUserPayload): HttpLoggedInUser {
    const payload: HttpJwtPayload = { phone: user.phone, otp: user.otp };
    return {
      phone: user.phone,
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async getUser(by: { phone: number }): Promise<User | undefined> {
    console.log(this.userRepository);
    return this.userRepository.findUser({ phone: by.phone });
  }
}
