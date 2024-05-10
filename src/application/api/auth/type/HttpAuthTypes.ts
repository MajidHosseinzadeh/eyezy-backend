import { UserRole } from '@core/common/enums/UserEnums';
import { Request } from 'express';
import { Types } from 'mongoose';

export type HttpUserPayload = {
  phone: number,
  otp: number,
  role: UserRole
};

export type HttpRequestWithUser = Request & {user: HttpUserPayload};

export type HttpJwtPayload = {
  phone: number,
  otp: number,
};

export type HttpLoggedInUser = {
  phone: number,
  accessToken: string,
};

export type HttpVerifyOTPPayload = {
  phone: number,
  code: Types.ObjectId,
  role: UserRole
};