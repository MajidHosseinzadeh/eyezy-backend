import { UserRole } from '@core/common/enums/UserEnums';
import { ObjectId } from 'mongoose';

export type CreateUserEntityPayload = {
  phone: number;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  password: string | null;
  createdAt?: Date;
  editedAt?: Date | null;
  removedAt?: Date | null;
};
