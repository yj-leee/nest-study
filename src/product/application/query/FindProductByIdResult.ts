import { IQueryResult } from "@nestjs/cqrs";

export class FindProductByIdResult implements IQueryResult {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}
