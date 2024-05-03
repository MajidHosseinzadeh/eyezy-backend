import { HttpJwtPayload, HttpLoggedInUser, HttpUserPayload } from '@application/api/auth/type/HttpAuthTypes';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { MongooseUserRepositoryAdapter } from '@infrastructure/adapter/persistence/mongoose/repository/MongooseUserRepositoryAdapter';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'typeorm';

@Injectable()
export class HttpAuthService {
  constructor(
    @Inject(UserDITokens.UserRepository)
    private userRepository: MongooseUserRepositoryAdapter,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(phone: number, password: string): Promise<HttpUserPayload | null> {
    const user: Optional<User> = (await this.userRepository.findUser({ phone: phone })) || undefined;

    if (user) {
      const isPasswordValid: boolean | null = await user.comparePassword(password);
      if (isPasswordValid) {
        return { phone: user.getPhone(), code: user.getId(), role: user.getRole() };
      }
    }

    return null;
  }

  public login(user: HttpUserPayload): HttpLoggedInUser {
    const payload: HttpJwtPayload = { phone: user.phone };
    return {
      phone: user.phone,
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async getUser(by: { phone: number }): Promise<User | undefined> {
    console.log(this.userRepository)
    return this.userRepository.findUser({ phone: by.phone });
  }
}
