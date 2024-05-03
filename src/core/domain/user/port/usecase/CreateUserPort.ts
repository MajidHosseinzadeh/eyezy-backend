import { UserRole } from '@core/common/enums/UserEnums';

export interface CreateUserPort {
  phone: number;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  password: string | null;
}
