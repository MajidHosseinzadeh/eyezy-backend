import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class HttpRestApiModelLoggedInUser {
  
  @ApiProperty({type: 'string'})
  public id: Types.ObjectId;
  
  @ApiProperty({type: 'string'})
  public accessToken: string;
  
}
