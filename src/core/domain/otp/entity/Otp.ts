import { Entity } from '@core/common/entity/Entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types, model } from 'mongoose';
import { CreateOtpEntityPayload } from './type/CreateOtpEntityPayload';
import { OtpStatus } from '@core/common/enums/OtpEnums';
import { compare } from 'bcryptjs';
import { User } from '@core/domain/user/entity/User';

@Schema({
  timestamps: {
    createdAt: 'created_at',
  },
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret.__v;
      return ret;
    },
  },
})
export class Otp extends Entity<Types.ObjectId> {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  private user_id: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.Number, required: true, unique: true, default: () => (Math.floor(10000 + Math.random() * 90000)) })
  private otp: number;
  @Prop({ type: mongoose.Schema.Types.String, required: true, default: OtpStatus.ACTIVE, enum: OtpStatus })
  private status: OtpStatus;
  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  private otp_expires: number;

  constructor(payload: CreateOtpEntityPayload) {
    super();
    this.user_id = payload.user_id;
    this.status = OtpStatus.ACTIVE;
    this.otp_expires = Date.now() + 0.5 * 60 * 1000;
  }

  public getOtp(): number {
    return this.otp;
  }
  public isActive(): boolean {
    return this.status === OtpStatus.ACTIVE;
  }

  public async deactivate(): Promise<void> {
    if (this.status === OtpStatus.EXPIRED) throw new Error('Otp is already expired!');
    if (this.status === OtpStatus.ACTIVE) this.status = OtpStatus.EXPIRED;
    await this.validate();
  }

  public async compareOTP(otp: number, user_id: Types.ObjectId): Promise<boolean> {
    if (this.status !== OtpStatus.EXPIRED && this.user_id === user_id && this.otp_expires > Date.now()) {
      const are_equal = await compare(otp.toString(), this.otp.toString());

      if (are_equal) {
        await this.deactivate();
        await this.validate();
        return are_equal;
      }
    }

    return false;
  }

  public static async new(payload: CreateOtpEntityPayload): Promise<Otp> {
    const otp: Otp = new Otp(payload);
    await otp.validate();

    return otp;
  }
}

export type OtpDocument = HydratedDocument<Otp>;
export const OtpSchema = SchemaFactory.createForClass(Otp);
export const OtpModel = model<OtpDocument>(Otp.name, OtpSchema);
