import { Module } from "@nestjs/common";

import { AppController } from "src/AppController";
import { AppService } from "src/AppService";

import { ProductModule } from "src/product/ProductModule";

@Module({
  imports: [
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
