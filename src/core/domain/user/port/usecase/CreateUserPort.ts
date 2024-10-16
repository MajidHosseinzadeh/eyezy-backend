import { UserRole } from '@core/common/enums/UserEnums';

export interface CreateUserPort {
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
}
