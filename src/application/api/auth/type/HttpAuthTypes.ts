import { UserRole } from '@core/common/enums/UserEnums';
import { Request } from 'express';

export type HttpUserPayload = {
  phone: number,
  role: UserRole,
};

export type HttpRequestWithUser = Request & {user: HttpUserPayload};

export type HttpJwtPayload = {
  phone: number,
};

export type HttpLoggedInUser = {
  phone: number,
  accessToken: string,
};
