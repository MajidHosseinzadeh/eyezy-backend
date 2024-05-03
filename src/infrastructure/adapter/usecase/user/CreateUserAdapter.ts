import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { UserRole } from '@core/common/enums/UserEnums';
import { IsNullable } from '@core/common/util/decorator/IsNullable';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateUserAdapter extends UseCaseValidatableAdapter implements CreateUserPort {
  @Expose()
  @IsNumber()
  public phone: number;

  @Expose()
  @IsNullable()
  @IsString()
  public firstName: string | null;

  @Expose()
  @IsNullable()
  @IsString()
  public lastName: string | null;

  @Expose()
  @IsIn([UserRole.CUSTOMER, UserRole.GUEST, UserRole.SUPERADMIN, UserRole.ADMIN])
  public role: UserRole;

  @Expose()
  @IsNullable()
  @IsString()
  public password: string | null;

  public static async new(payload: CreateUserPort): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
