import { HttpAuthService } from '@application/api/auth/HttpAuthService';
import { HttpLoggedInUser, HttpRequestWithUser } from '@application/api/auth/type/HttpAuthTypes';
import { HttpRestApiModelLogInBody } from '@application/api/controller/documentation/auth/HttpRestApiModelLogInBody';
import { HttpRestApiResponseLoggedInUser } from '@application/api/controller/documentation/auth/HttpRestApiResponseLoggedInUser';
import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpRestApiResponseUser } from './documentation/user/HttpRestApiResponseUser';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { UserRole } from '@core/common/enums/UserEnums';
import { HttpRestApiModelAccountRequestBody } from './documentation/user/HttpRestApiModelCreateUserBody';
import { HttpOtpAuthGaurd } from '../auth/guard/HttpOtpAuthGaurd';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: HttpAuthService,
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(UserDITokens.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(HttpLocalAuthGuard)
  @ApiBody({ type: HttpRestApiModelLogInBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseLoggedInUser })
  public async login(@Req() request: HttpRequestWithUser): Promise<CoreApiResponse<HttpLoggedInUser>> {
    console.log(request.body);
    return CoreApiResponse.success(this.authService.login(request.body));
  }

  @Post('account')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpRestApiModelAccountRequestBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  public async requestAccount(@Body() body: HttpRestApiModelAccountRequestBody)
  // Promise<CoreApiResponse<UserUseCaseDto>> 
  {

    // const adapter: RequestAccountAdapter = await RequestAccountAdapter.new({
    //   phone: body.phone,
    //   role: UserRole.CUSTOMER,
    // }); 
    
    await this.authService.behavior(body.phone, UserRole.CUSTOMER)

    // const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(adapter);

    // return CoreApiResponse.success(createdUser);
  }

  @Post('verify_otp')
  @UseGuards(HttpOtpAuthGaurd)
  public async verifyOTP(@Req() request: HttpRequestWithUser): Promise<CoreApiResponse<HttpLoggedInUser>> {
    console.log(request.body);
    return CoreApiResponse.success(this.authService.login({...request.body, role: UserRole.CUSTOMER}));
  }
}
