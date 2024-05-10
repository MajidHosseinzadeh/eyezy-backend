import { UserRole, UserStatus } from '@core/common/enums/UserEnums';
import { ObjectId } from 'mongoose';

export type CreateUserEntityPayload = {
  phone: number;
  role: UserRole;
  status: UserStatus;
};
