import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de validación
  app.useGlobalPipes(new ValidationPipe());

  // Configuración para habilitar CORS si usas frontend
  app.enableCors();

  // Puerto de escucha
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();
