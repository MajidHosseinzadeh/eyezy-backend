import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

@Exclude()
export class GetUserAdapter extends UseCaseValidatableAdapter implements GetUserPort {
  
  @Expose()
  @IsNumber()
  public phone: number;
  
  public static async new(payload: GetUserPort): Promise<GetUserAdapter> {
    const adapter: GetUserAdapter = plainToClass(GetUserAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
  
}
