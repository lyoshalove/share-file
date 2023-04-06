import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://share-file-plum.vercel.app/',
      'https://share-file-lyoshalove.vercel.app',
      'https://share-file-git-main-lyoshalove.vercel.app',
      '*',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  });

  await app.listen(3000);
}
bootstrap();
