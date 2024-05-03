import { UserRole } from '@core/common/enums/UserEnums';
import { Nullable } from '@core/common/type/CommonTypes';
import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class UserModel extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  editedAt: Date | null;

  @Prop({ type: Date, default: null })
  removedAt: Date | null;
}

export default UserModel;
