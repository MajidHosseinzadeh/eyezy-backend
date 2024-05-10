import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiServerConfig {

  constructor(private configService: ConfigService) {}

  get API_HOST(): string {
    return this.configService.get<string>('API_HOST', { infer: true }) || '';
  }

  get API_PORT(): number {
    return this.configService.get<number>('API_PORT', { infer: true }) || '';
  }

  get API_ACCESS_TOKEN_SECRET(): string {
    return this.configService.get<string>('API_ACCESS_TOKEN_SECRET') || '';
  }

  get API_ACCESS_TOKEN_TTL_IN_MINUTES(): number {
    return this.configService.get<number>('API_ACCESS_TOKEN_TTL_IN_MINUTES', { infer: true }) || '';
  }

  get API_ACCESS_TOKEN_HEADER(): string {
    return this.configService.get<string>('API_ACCESS_TOKEN_HEADER', { infer: true }) || '';
  }

  get API_LOGIN_USERNAME_FIELD(): string {
    return this.configService.get<string>('API_LOGIN_USERNAME_FIELD', { infer: true }) || '';
  }

  get API_LOGIN_PASSWORD_FIELD(): string {
    return this.configService.get<string>('API_LOGIN_PASSWORD_FIELD', { infer: true }) || '';
  }

  get API_LOG_ENABLE(): boolean {
    return this.configService.get<boolean>('API_LOG_ENABLE', { infer: true });
  }

  get LOG_ENABLE(): boolean {
    return this.configService.get<boolean>('LOG_ENABLE', { infer: true });
  }

}
