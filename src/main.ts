import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as Sentry from "@sentry/node";

import { AppModule } from "src/AppModule";
import { Config } from "src/Config";

function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle("Node Study")
    .setDescription("Node Study swagger document")
    .setVersion("0.1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  Sentry.init({
    dsn: new Config().SENTRY_DSN,
  });
  setupSwagger(app);
  await app.listen(new Config().PORT);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
