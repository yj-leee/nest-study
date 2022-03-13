import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsString, Length } from "class-validator";

export class DeleteProductRequestParam {
  @IsString()
  @Length(32, 32)
  @IsAlphanumeric()
  @ApiProperty()
  readonly id: string;
}
