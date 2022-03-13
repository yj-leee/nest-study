import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductResponseDto {
  @ApiProperty()
  readonly id: string;
}
