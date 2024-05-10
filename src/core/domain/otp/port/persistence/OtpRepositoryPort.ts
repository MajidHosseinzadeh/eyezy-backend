import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { Optional } from '@core/common/type/CommonTypes';
import { Otp, OtpDocument } from '@core/domain/otp/entity/Otp';
import { Types } from 'mongoose';

export interface OtpRepositoryPort {
  findOtp(by: { user_id?: Types.ObjectId }, options?: RepositoryFindOptions): Promise<Optional<Otp>>;

  countOtps(by: { user_id: Types.ObjectId }, options?: RepositoryFindOptions): Promise<number>;

  addOtp(otp: Otp): Promise<OtpDocument>;

  updateOtp(otp: Otp): Promise<void>;
}
