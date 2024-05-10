import { Otp, OtpDocument } from '@core/domain/otp/entity/Otp';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class OtpUseCaseDto {
  @Expose()
  @IsNumber()
  public phone: number;

  public static newFromOtp(Otp: OtpDocument | Otp): OtpUseCaseDto {
    return plainToClass(OtpUseCaseDto, Otp);
  }

  public static newListFromOtps(Otps: Otp[]): OtpUseCaseDto[] {
    return Otps.map((Otp) => this.newFromOtp(Otp));
  }
}
