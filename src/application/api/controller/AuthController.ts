import { HttpLocalAuthGuard } from '@application/api/auth/guard/HttpLocalAuthGuard';
import { HttpAuthService } from '@application/api/auth/HttpAuthService';
import { HttpLoggedInUser, HttpRequestWithUser } from '@application/api/auth/type/HttpAuthTypes';
import { HttpRestApiModelLogInBody } from '@application/api/controller/documentation/auth/HttpRestApiModelLogInBody';
import { HttpRestApiResponseLoggedInUser } from '@application/api/controller/documentation/auth/HttpRestApiResponseLoggedInUser';
import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  
  constructor(private readonly authService: HttpAuthService) {}
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(HttpLocalAuthGuard)
  @ApiBody({type: HttpRestApiModelLogInBody})
  @ApiResponse({status: HttpStatus.OK, type: HttpRestApiResponseLoggedInUser})
  public async login(@Req() request: HttpRequestWithUser): Promise<CoreApiResponse<HttpLoggedInUser>> {
    console.log(request.body)
    return CoreApiResponse.success(this.authService.login(request.body));
  }
  
}
