import { Entity } from '@core/common/entity/Entity';
import { RemovableEntity } from '@core/common/entity/RemovableEntity';
import { UserRole, UserStatus } from '@core/common/enums/UserEnums';
import { Nullable } from '@core/common/type/CommonTypes';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';
import { EditUserEntityPayload } from '@core/domain/user/entity/type/EditUserEntityPayload';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import mongoose, { HydratedDocument, ObjectId, Types, model } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
})
export class User extends Entity<Types.ObjectId> implements RemovableEntity {
  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  private phone      : number         ;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  private firstName  : string | null  ;
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  private lastName   : string | null  ;
  @Prop({ type: mongoose.Schema.Types.String, required: true, default: UserRole.CUSTOMER, enum: UserRole })
  private role       : UserRole       ;
  @Prop({ type: mongoose.Schema.Types.String, required: true, default: UserStatus.NEW, enum: UserStatus })
  private status     : UserStatus     ; 
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  private password   : string | null  ;
  @Prop({ type: mongoose.Schema.Types.Date, required: false })
  private removed_at : Date   | null  ;


  constructor(payload: CreateUserEntityPayload) {
    super();
    this.phone      = payload.phone                            ;
    this.role       = payload.role                             ;
    this.status     = UserStatus.NEW                           ;
  }

  public getPhone(): number {
    return this.phone;
  }

  public getFirstName(): string | null {
    return this.firstName;
  }

  public getLastName(): string | null {
    return this.lastName;
  }

  public getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public getStatus(): UserStatus {
    return this.status;
  }

  public getPassword(): string | null {
    return this.password;
  }

  public getRemovedAt(): Date | null {
    return this.removed_at;
  }

  public async hashPassword(): Promise<void> {
    const salt: string = await genSalt();
    if (this.password) this.password = await hash(this.password, salt);

    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean | null> {
    if (this.password) return compare(password, this.password)
    return true;
  }

  public async generateOTP(): Promise<{OneTimePassword: string, OTPExpires: number}> {
    const digits = '123456789'; 
    let OneTimePassword: string = "";
    const OTPExpires = Date.now() + 10 * 60 * 1000;

    for (let i = 0; i < 5; i++) { 
      OneTimePassword += digits[Math.floor(Math.random() * digits.length)]; 
    }

    // this.otp = parseInt(OneTimePassword)
    // this.otp_expires = OTPExpires
    return {OneTimePassword, OTPExpires};
  };

  public async compareOTP(otp: number): Promise<boolean | null> {
    // if (this.otp) {
      // if(this.status === UserStatus.NEW) this.status = UserStatus.VERIFIED
      // return compare(otp.toString(), this.otp.toString())
    // }
    return null;
  }

  public async edit(payload: EditUserEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.firstName) {
      this.firstName = payload.firstName;
    }
    if (payload.lastName) {
      this.lastName = payload.lastName;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removed_at = new Date();
    await this.validate();
  }

  public static async new(payload: CreateUserEntityPayload): Promise<User> {
    const user: User = new User(payload);
    await user.hashPassword()
    // await user.generateOTP()
    await user.validate();

    return user;
  }

}


export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model<UserDocument>(User.name, UserSchema);

