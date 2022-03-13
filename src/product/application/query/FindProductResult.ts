import { IQueryResult } from "@nestjs/cqrs";

export class FindProductResult
  extends Array<{
    readonly id: string;
    readonly title: string;
  }>
  implements IQueryResult {}
