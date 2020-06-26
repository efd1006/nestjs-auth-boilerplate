import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  if(process.env.ENV == 'DEV') {
    const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJs Template')
    .setDescription('APIs for NestJs Template.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(Number(process.env.APP_PORT)|| 3000);
}
bootstrap();
