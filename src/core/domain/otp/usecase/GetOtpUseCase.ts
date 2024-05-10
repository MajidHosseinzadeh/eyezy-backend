import { UseCase } from '@core/common/usecase/UseCase';
import { GetOtpPort } from '@core/domain/otp/port/usecase/GetOtpPort';
import { OtpUseCaseDto } from '@core/domain/otp/usecase/dto/OtpUseCaseDto';

export interface GetOtpUseCase extends UseCase<GetOtpPort, OtpUseCaseDto> {}
