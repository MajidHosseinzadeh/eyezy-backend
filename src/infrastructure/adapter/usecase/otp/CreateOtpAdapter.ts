import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { IsNullable } from '@core/common/util/decorator/IsNullable';
import { CreateOtpPort } from '@core/domain/otp/port/usecase/CreateOtpPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

@Exclude()
export class CreateOtpAdapter extends UseCaseValidatableAdapter implements CreateOtpPort {
  @Expose()
  @IsMongoId()
  public user_id: Types.ObjectId;

  public static async new(payload: CreateOtpPort): Promise<CreateOtpAdapter> {
    const adapter: CreateOtpAdapter = plainToClass(CreateOtpAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
