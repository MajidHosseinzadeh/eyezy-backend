import { UserRole } from '@core/common/enums/UserEnums';

export type CreateUserEntityPayload = {
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
  id?: string;
  createdAt?: Date;
  editedAt?: Date | null;
  removedAt?: Date | null;
};
