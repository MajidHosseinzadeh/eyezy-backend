import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiServerConfig {

  constructor(private configService: ConfigService) {}

  get TWILLIO_ACCOUNT_SID(): string {
    return this.configService.get<string>('TWILLIO_ACCOUNT_SID', { infer: true }) || '';
  }

  get TWILLIO_MESSAGING_SID(): string {
    return this.configService.get<string>('TWILLIO_MESSAGING_SID', { infer: true }) || '';
  }

  get TWILLIO_AUTH_TOKEN(): string {
    return this.configService.get<string>('TWILLIO_AUTH_TOKEN', { infer: true }) || '';
  }

  get TWILLIO_PHONE_NUMBER(): string {
    return this.configService.get<string>('TWILLIO_PHONE_NUMBER', { infer: true }) || '';
  }

}
