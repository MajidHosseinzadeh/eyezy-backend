import { Types } from "mongoose";

export type CreateOtpEntityPayload = {
  user_id: Types.ObjectId;
};
