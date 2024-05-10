import { UserRole } from '@core/common/enums/UserEnums';
import { ObjectId, Types } from 'mongoose';

export class GetUserPreviewQueryResult {

  public readonly id: Types.ObjectId;

  public readonly phone: number;

  public readonly name: string;

  public readonly role: UserRole;

  constructor(id: Types.ObjectId, phone: number, name: string, role: UserRole) {
    this.id = id;
    this.phone = phone;
    this.name = name;
    this.role = role;
  }

  public static new(id: Types.ObjectId, phone: number, name: string, role: UserRole): GetUserPreviewQueryResult {
    return new GetUserPreviewQueryResult(id, phone, name, role);
  }
}
