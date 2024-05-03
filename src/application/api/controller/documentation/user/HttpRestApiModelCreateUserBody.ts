import { UserRole } from '@core/common/enums/UserEnums';
import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelCreateUserBody {
  @ApiProperty({type: 'number'})
  public phone: number;

  @ApiProperty({type: 'string'})
  public firstName: string | null;
  
  @ApiProperty({type: 'string'})
  public lastName: string | null;
  
  @ApiProperty({type: 'string'})
  public role: UserRole;
  
  @ApiProperty({type: 'string'})
  public password: string | null;
  
}
