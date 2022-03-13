import { ApiProperty } from "@nestjs/swagger";

class Product {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;
}

export class FindProductResponseDto {
  @ApiProperty({ type: [Product] })
  readonly products: Product[];
}
