import { FindProductByIdResult } from "src/product/application/query/FindProductByIdResult";
import { FindProductResult } from "src/product/application/query/FindProductResult";

export interface ProductQuery {
  find: (offset: number, limit: number) => Promise<FindProductResult>;
  findById: (id: string) => Promise<FindProductByIdResult | null>;
}
