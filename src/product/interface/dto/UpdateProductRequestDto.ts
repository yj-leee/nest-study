import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateProductRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, nullable: true })
  readonly title: string | null = null;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, nullable: true })
  readonly imageFileId: string | null = null;
}
