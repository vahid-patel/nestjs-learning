import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted:true
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
