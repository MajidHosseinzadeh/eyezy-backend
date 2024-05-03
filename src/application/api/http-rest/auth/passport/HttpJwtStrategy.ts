import { HttpAuthService } from '@application/api/http-rest/auth/HttpAuthService';
import { HttpJwtPayload, HttpUserPayload } from '@application/api/http-rest/auth/type/HttpAuthTypes';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(private authService: HttpAuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(configService.get<string>("API_ACCESS_TOKEN_HEADER") || ""),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("API_ACCESS_TOKEN_SECRET"),
    });
  }
  
  public async validate(payload: HttpJwtPayload): Promise<HttpUserPayload> {
    const user: User = CoreAssert.notEmpty(
      await this.authService.getUser({id: payload.id}),
      Exception.new({code: Code.UNAUTHORIZED_ERROR})
    );
  
    return {id: user.getId(), role: user.getRole()};
  }
  
}
