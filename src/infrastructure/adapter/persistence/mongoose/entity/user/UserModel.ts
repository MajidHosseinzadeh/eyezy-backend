import { UserRole } from '@core/common/enums/UserEnums';
import { Nullable } from '@core/common/type/CommonTypes';
import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class UserModel extends Document {
  @Prop({ type: Number, required: true })
  phone: number;

  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: false })
  firstName: string | null;

  @Prop({ type: String, required: false })
  lastName: string | null;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ type: String, required: false })
  password: string | null;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  editedAt: Date | null;

  @Prop({ type: Date, default: null })
  removedAt: Date | null;
}

export default UserModel;
