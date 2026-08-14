import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Prefijo para todas las rutas
  app.setGlobalPrefix('api');

  // Pipe de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos no definidos en los DTOs
      forbidNonWhitelisted: true, // Lanza error si llegan campos no definidos
      transform: true, // Transforma automáticamente los payloads a instancias de los DTOs
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
void bootstrap();
