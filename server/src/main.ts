import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173/',
      'https://share-file-plum.vercel.app/',
      'https://share-file-lyoshalove.vercel.app/',
      'https://share-file-git-main-lyoshalove.vercel.app/',
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
