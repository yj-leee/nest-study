import { Controller, Get } from "@nestjs/common";

@Controller('product')
export class ProductController {
  @Get()
  getProduct() {
    return 'This is product controller';
  }
}
