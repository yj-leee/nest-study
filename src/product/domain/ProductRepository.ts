import { Product } from "src/product/domain/Product";

export interface ProductRepository {
  newId: () => string;
  save: (product: Product) => Promise<void>;
  findById: (id: string) => Promise<Product | null>;
}
