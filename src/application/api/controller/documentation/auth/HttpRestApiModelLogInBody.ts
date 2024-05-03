import { UserRole } from '@core/common/enums/UserEnums';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class HttpRestApiModelLogInBody {
  
  @ApiProperty({type: 'string'})
  public phone: string;
  
  @ApiProperty({type: 'string'})
  public code: Types.ObjectId;

  @ApiProperty({type: 'string', enum: UserRole})
  public role: UserRole;
}

