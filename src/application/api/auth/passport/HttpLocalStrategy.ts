import { HttpAuthService } from '@application/api/auth/HttpAuthService';
import { HttpUserPayload } from '@application/api/auth/type/HttpAuthTypes';
import { Code } from '@core/common/code/Code';
import { UserRole } from '@core/common/enums/UserEnums';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class HttpLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: HttpAuthService, private configService: ConfigService) {
    super({
      usernameField: configService.get<string>('API_LOGIN_USERNAME_FIELD'),
      passwordField: configService.get<string>('API_LOGIN_PASSWORD_FIELD'),
    });
  }

  public async validate(phone: number, password: string): Promise<HttpUserPayload> {
    const user: HttpUserPayload = CoreAssert.notEmpty(
      {phone: 111, otp: 1111, role: UserRole.CUSTOMER},
      // await this.authService.validateUser(phone, password),
      Exception.new({ code: Code.WRONG_CREDENTIALS_ERROR })
    );

    return user;
  }
}
