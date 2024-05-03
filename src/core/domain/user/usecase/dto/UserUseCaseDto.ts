import { UserRole } from '@core/common/enums/UserEnums';
import { IsNullable } from '@core/common/util/decorator/IsNullable';
import { User } from '@core/domain/user/entity/User';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  @IsString()
  public id: string;

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
  public role: UserRole;

  public static newFromUser(user: User): UserUseCaseDto {
    return plainToClass(UserUseCaseDto, user);
  }

  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map((user) => this.newFromUser(user));
  }
}
