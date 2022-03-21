import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { RavenModule, RavenInterceptor } from "nest-raven";
import { AppController } from "src/AppController";
import { AppService } from "src/AppService";

import { ProductModule } from "src/product/ProductModule";

@Module({
  imports: [RavenModule, ProductModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    },
    AppService,
  ],
})
export class AppModule {}
