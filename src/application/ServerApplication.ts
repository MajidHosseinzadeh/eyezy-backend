import { RootModule } from '@application/di/.RootModule';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class ServerApplication {
  
  // private readonly host: string = ApiServerConfig.API_HOST;
  
  // private readonly port: number = ApiServerConfig.API_PORT;

  private readonly host: string = "0.0.0.0";
  
  private readonly port: number = 1;
  
  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule);
    const configService = app.get<ConfigService>(ConfigService);
    const HOST = configService.get<string>("API_HOST") || ""
    const PORT = configService.get<number>("API_PORT") || 0
    this.buildAPIDocumentation(app);
    this.log();
  
    await app.listen(PORT, HOST);
  }
  
  private buildAPIDocumentation(app: NestExpressApplication): void {
    const configService = app.get<ConfigService>(ConfigService);
    const API_ACCESS_TOKEN_HEADER = configService.get<string>("API_ACCESS_TOKEN_HEADER") || ""
    const title: string = 'eyezy';
    const description: string = 'eyezy API documentation';
    const version: string = '1.0.0';
    
    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth({ type: 'apiKey', in: 'header', name: API_ACCESS_TOKEN_HEADER })
      .build();
    
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
    
    SwaggerModule.setup('documentation', app, document);
  }
  
  private log(): void {
    Logger.log(`Server started on host: ${this.host}; port: ${this.port};`, ServerApplication.name);
  }
  
  public static new(): ServerApplication {
    return new ServerApplication();
  }
  
}
