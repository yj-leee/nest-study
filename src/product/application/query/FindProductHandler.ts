import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { InjectionToken } from "src/product/application/InjectionToken";
import { FindProductQuery } from "src/product/application/query/FindProductQuery";
import { FindProductResult } from "src/product/application/query/FindProductResult";
import { ProductQuery } from "src/product/application/query/ProductQuery";

@QueryHandler(FindProductQuery)
export class FindProductHandler
  implements IQueryHandler<FindProductQuery, FindProductResult>
{
  @Inject(InjectionToken.PRODUCT_QUERY)
  private readonly productQuery: ProductQuery;

  async execute(query: FindProductQuery): Promise<FindProductResult> {
    const products = await this.productQuery.find(query.offset, query.limit);
    return products.map(({ id, title }) => ({ id, title }));
  }
}
