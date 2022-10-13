import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);   // fuso horario 
  process.env.TZ = '-03:00';

  app.useGlobalPipes (new ValidationPipe());   // validações 
  app.enableCors();                           // habilitar que recebe requisição de qualquer lugar
  await app.listen(4000);                     // porta de acesso 4000 (porta do back end) 
}
bootstrap();
