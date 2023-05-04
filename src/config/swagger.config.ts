import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swagger = (app: INestApplication, environment: string) => {
  if (environment === 'production') return;
  
  // document options
  const docOptions = new DocumentBuilder()
    .setTitle('SuperVisor Escolar API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // create document
  const document = SwaggerModule.createDocument(app, docOptions);

  // set up docs route
  SwaggerModule.setup('api', app, document);
}