import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);   // fuso horario 

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact('Generation Brasil', 'http://www.generationbrasil.online', 'generation@email.com')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes (new ValidationPipe());   // validações 
  app.enableCors();                           // habilitar que recebe requisição de qualquer lugar
  await app.listen(process.env.PORT || 4000);   // porta de acesso 4000 (porta do back end) 
}
bootstrap();
