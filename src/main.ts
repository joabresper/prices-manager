import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: 'http://127.0.0.1:5501',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: 'https://prices-manager-frontend.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
