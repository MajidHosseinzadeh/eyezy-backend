import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService) {}

  get DB_URL(): string {
    return this.configService.get<string>('DB_URL', { infer: true }) || '';
  }

  get DB_USERNAME(): string {
    return this.configService.get<string>('DB_USERNAME', { infer: true }) || '';
  }

  get DB_PASSWORD(): string {
    return this.configService.get<string>('DB_PASSWORD', { infer: true }) || '';
  }

  get DB_HOST(): string {
    return this.configService.get<string>('DB_HOST', { infer: true }) || '';
  }

  get DB_NAME(): string {
    return this.configService.get<string>('DB_NAME', { infer: true }) || '';
  }

  get DB_PORT(): number {
    return this.configService.get<number>('DB_PORT', { infer: true });
  }

  get DB_LOG_ENABLE(): boolean {
    return this.configService.get<boolean>('DB_LOG_ENABLE', { infer: true });
  }

  get DB_MONGOOSE_URL(): string {
    return this.DB_URL.replace('<USERNAME>', this.DB_USERNAME).replace('<PASSWORD>', this.DB_PASSWORD).replace('<HOST>', this.DB_HOST);
  }
}
