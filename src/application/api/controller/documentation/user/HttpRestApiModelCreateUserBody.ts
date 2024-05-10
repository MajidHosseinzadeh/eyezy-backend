import { UserRole } from '@core/common/enums/UserEnums';
import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelAccountRequestBody {
  @ApiProperty({type: 'number'})
  public phone: number;
}
