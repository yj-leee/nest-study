import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { InjectionToken } from "src/product/application/InjectionToken";
import { FindProductByIdQuery } from "src/product/application/query/FindProductByIdQuery";
import { FindProductByIdResult } from "src/product/application/query/FindProductByIdResult";
import { ProductQuery } from "src/product/application/query/ProductQuery";

@QueryHandler(FindProductByIdQuery)
export class FindProductByIdHandler
  implements IQueryHandler<FindProductByIdQuery, FindProductByIdResult | null>
{
  @Inject(InjectionToken.PRODUCT_QUERY)
  private readonly productQuery: ProductQuery;

  async execute(
    query: FindProductByIdQuery
  ): Promise<FindProductByIdResult | null> {
    return await this.productQuery.findById(query.id);
  }
}
