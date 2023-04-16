import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'https://share-file-plum.vercel.app',
        'https://share-file-lyoshalove.vercel.app',
        'https://share-file-git-main-lyoshalove.vercel.app',
        'http://localhost:5173',
      ],
      allowedHeaders: ['Access-Control-Allow-Origin'],
    },
  });

  await app.listen(3000);
}
bootstrap();
