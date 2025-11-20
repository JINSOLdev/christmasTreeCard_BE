import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://christmas-tree-card-fe.vercel.app/',
    ],
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error(`Error during bootstrap:`, err);
  // 추후에 오류 처리 로직 추가 예정
});
