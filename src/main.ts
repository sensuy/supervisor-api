import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConfig } from './config/server.config';
import { swagger } from './config/swagger.config';

async function bootstrap() {
  const appServerConfig = serverConfig();
  const app = await NestFactory.create(AppModule);

  // Register swagger for development
  swagger(app, appServerConfig.environment);
  
  await app.listen(appServerConfig.port);
}
bootstrap();
