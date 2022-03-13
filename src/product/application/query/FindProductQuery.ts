import { IQuery } from "@nestjs/cqrs";

export class FindProductQuery implements IQuery {
  constructor(readonly offset: number, readonly limit: number) {}
}
