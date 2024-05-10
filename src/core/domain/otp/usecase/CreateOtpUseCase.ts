import { UseCase } from '@core/common/usecase/UseCase';
import { CreateOtpPort } from '@core/domain/otp/port/usecase/CreateOtpPort';
import { OtpUseCaseDto } from '@core/domain/otp/usecase/dto/OtpUseCaseDto';

export interface CreateOtpUseCase extends UseCase<CreateOtpPort, OtpUseCaseDto> {}
