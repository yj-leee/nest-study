import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FindProductByIdRequestParam {
  @IsString()
  @ApiProperty()
  readonly id: string;
}
