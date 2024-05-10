import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/assert/CoreAssert';
import { Otp } from '@core/domain/otp/entity/Otp';
import { OtpRepositoryPort } from '@core/domain/otp/port/persistence/OtpRepositoryPort';
import { CreateOtpPort } from '@core/domain/otp/port/usecase/CreateOtpPort';
import { CreateOtpUseCase } from '@core/domain/otp/usecase/CreateOtpUseCase';
import { OtpUseCaseDto } from '@core/domain/otp/usecase/dto/OtpUseCaseDto';

export class CreateOtpService implements CreateOtpUseCase {
  constructor(private readonly OtpRepository: OtpRepositoryPort) {}

  public async execute(payload: CreateOtpPort): Promise<OtpUseCaseDto> {
    const doesOtpExist: boolean = !!(await this.OtpRepository.countOtps({
      user_id: payload.user_id,
    }));
    CoreAssert.isFalse(
      doesOtpExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'Otp already exists.',
      })
    );

    const otp: Otp = await Otp.new({
      user_id: payload.user_id,
    });

    const createdOtp = await this.OtpRepository.addOtp(otp);
    return OtpUseCaseDto.newFromOtp(createdOtp);
  }
}
