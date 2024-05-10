import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/type/CommonTypes';
import { Otp } from '@core/domain/otp/entity/Otp';
import { OtpRepositoryPort } from '@core/domain/otp/port/persistence/OtpRepositoryPort';
import { GetOtpPort } from '@core/domain/otp/port/usecase/GetOtpPort';
import { GetOtpUseCase } from '@core/domain/otp/usecase/GetOtpUseCase';
import { OtpUseCaseDto } from '@core/domain/otp/usecase/dto/OtpUseCaseDto';

export class GetUserService implements GetOtpUseCase {
  constructor(private readonly otpRepository: OtpRepositoryPort) {}

  public async execute(payload: GetOtpPort): Promise<OtpUseCaseDto> {
    const otp: Optional<Otp> = await this.otpRepository.findOtp({
      user_id: payload.user_id,
    });
    if (!otp) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Otp not found.',
      });
    }

    return OtpUseCaseDto.newFromOtp(otp);
  }
}
