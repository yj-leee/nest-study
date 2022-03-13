import { ApiProperty } from "@nestjs/swagger";

export class CreateProductResponseDto {
  @ApiProperty()
  readonly id: string;
}
