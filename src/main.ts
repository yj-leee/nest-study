import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { LoggingInterceptor } from "libs/LoggingInterceptor";
import { HttpExceptionFilter } from "libs/HttpExceptionFilter";
import { RequestParsingMiddleware } from "libs/RequestParsingMiddleware";

import { AppModule } from "src/AppModule";
import { Config } from "src/Config";

function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle("Noteing backend")
    .setDescription("Noteing backend swagger document")
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
  app.use(RequestParsingMiddleware);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);
  await app.listen(new Config().PORT);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
