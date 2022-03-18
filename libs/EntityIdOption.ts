import { ColumnType, PrimaryColumnOptions } from "typeorm";

export class EntityIdOption implements PrimaryColumnOptions {
  constructor(
    readonly type: ColumnType = "binary",
    readonly length: number = 16,
  ) {}
}
