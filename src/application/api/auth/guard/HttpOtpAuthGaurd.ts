import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HttpOtpAuthGaurd implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const otp = request.body.otp;

    return CoreAssert.isTrue(otp && /^\d{5}$/.test(otp), Exception.new({ code: Code.WRONG_CREDENTIALS_ERROR }))

  }
}