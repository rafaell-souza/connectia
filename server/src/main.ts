import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from './exception/exxeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter))

  app.useGlobalPipes(new ValidationPipe({
    enableDebugMessages: true,
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
