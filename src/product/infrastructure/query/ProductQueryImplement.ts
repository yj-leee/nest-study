import { getRepository } from "typeorm";
import { Inject } from "@nestjs/common";

import { EntityIdTransformer } from "libs/EntityIdTransformer";

import { ProductEntity } from "src/product/infrastructure/entity/ProductEntity";

import { FindProductByIdResult } from "src/product/application/query/FindProductByIdResult";
import { FindProductResult } from "src/product/application/query/FindProductResult";
import { ProductQuery } from "src/product/application/query/ProductQuery";

export class ProductQueryImplement implements ProductQuery {
  @Inject() private readonly entityIdTransformer: EntityIdTransformer;

  async find(offset: number, limit: number): Promise<FindProductResult> {
    return (
      await getRepository(ProductEntity).find({ skip: offset, take: limit })
    ).map(({ id, title }) => ({
      id: this.entityIdTransformer.from(id),
      title,
    }));
  }

  async findById(id: string): Promise<FindProductByIdResult | null> {
    const entity = await getRepository(ProductEntity).findOne(id);
    if (entity === undefined) return null;
    return new FindProductByIdResult(
      this.entityIdTransformer.from(entity.id),
      entity.title,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
