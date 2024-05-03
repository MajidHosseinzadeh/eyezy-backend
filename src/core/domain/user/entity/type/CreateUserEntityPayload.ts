import { UserRole } from '@core/common/enums/UserEnums';

export type CreateUserEntityPayload = {
  phone: number;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  password: string | null;
  id?: string;
  createdAt?: Date;
  editedAt?: Date | null;
  removedAt?: Date | null;
};
