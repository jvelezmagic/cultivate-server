import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServbice = app.get(ConfigService);

  const port = configServbice.get('PORT', 4000);
  await app.listen(port);
}
bootstrap();
