import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductRequestDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly creatorId: string;

  @IsString()
  @ApiProperty()
  readonly imageFileId: string;
}
