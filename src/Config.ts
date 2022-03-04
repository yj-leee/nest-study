import { Logger } from "@nestjs/common";
import { IsBoolean, IsInt, IsString, Min, validateSync } from "class-validator";

export class Config {
  private readonly logger = new Logger(Config.name);

  @IsInt()
  @Min(3000)
  readonly PORT: number = Number(process.env.PORT);

  @IsString()
  readonly DATABASE_WRITE_HOST: string = process.env
    .DATABASE_WRITE_HOST as string;

  @IsString()
  readonly DATABASE_READ_HOST: string = process.env
    .DATABASE_READ_HOST as string;

  @IsInt()
  @Min(3000)
  readonly DATABASE_PORT: number = Number(process.env.DATABASE_PORT);

  @IsString()
  readonly DATABASE_NAME: string = process.env.DATABASE_NAME as string;

  @IsString()
  readonly DATABASE_USER: string = process.env.DATABASE_USER as string;

  @IsString()
  readonly DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD as string;

  @IsBoolean()
  readonly DATABASE_SYNC: boolean = process.env.DATABASE_SYNC === "true";

  @IsBoolean()
  readonly DATABASE_LOGGING: boolean = process.env.DATABASE_LOGGING === "true";

  @IsString()
  readonly JWT_SECRET: string = process.env.JWT_SECRET as string;

  @IsString()
  readonly AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;

  @IsString()
  readonly AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

  @IsString()
  readonly AWS_REGION = process.env.AWS_REGION as string;

  @IsString()
  readonly AWS_S3_BUCKET = process.env.AWS_S3_BUCKET as string;

  @IsString()
  readonly GMAIL_USER = process.env.GMAIL_USER as string;

  @IsString()
  readonly GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID as string;

  @IsString()
  readonly GMAIL_PRIVATE_KEY = process.env.GMAIL_PRIVATE_KEY as string;

  constructor() {
    const error = validateSync(this);
    if (error.length) {
      this.logger.error("Config validation error: " + JSON.stringify(error));
      process.exit(1);
    }
  }
}
