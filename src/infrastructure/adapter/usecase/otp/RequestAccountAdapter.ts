import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { UserRole } from '@core/common/enums/UserEnums';
import { RequestAccountPort } from '@core/domain/user/port/usecase/RequestAccountPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';

@Exclude()
export class RequestAccountAdapter extends UseCaseValidatableAdapter implements RequestAccountPort {
  @Expose()
  @IsNumber()
  public phone: number;

  @Expose()
  @IsIn([UserRole.CUSTOMER, UserRole.GUEST, UserRole.SUPERADMIN, UserRole.ADMIN])
  public role: UserRole;

  public static async new(payload: RequestAccountPort): Promise<RequestAccountAdapter> {
    const adapter: RequestAccountAdapter = plainToClass(RequestAccountAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
