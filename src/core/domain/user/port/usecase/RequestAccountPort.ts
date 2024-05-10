import { UserRole } from '@core/common/enums/UserEnums';

export interface RequestAccountPort {
  phone: number;
  role: UserRole;
}
