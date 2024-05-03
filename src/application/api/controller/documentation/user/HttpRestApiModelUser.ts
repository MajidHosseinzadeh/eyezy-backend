import { UserRole } from '@core/common/enums/UserEnums';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class HttpRestApiModelUser {
  
  @ApiProperty({type: 'string'})
  public id: Types.ObjectId;
  
  @ApiProperty({type: 'string'})
  public firstName: string;
  
  @ApiProperty({type: 'string'})
  public lastName: string;
  
  @ApiProperty({enum: UserRole})
  public role: UserRole;
  
}
