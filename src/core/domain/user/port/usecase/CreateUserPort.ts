import { UserRole } from '@core/common/enums/UserEnums';

export interface CreateUserPort {
  phone: number;
  role: UserRole;
}
