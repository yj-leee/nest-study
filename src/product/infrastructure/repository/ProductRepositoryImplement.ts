import { Inject } from "@nestjs/common";
import { getRepository } from "typeorm";
import { EntityId } from "libs/EntityId";

import { ProductMapper } from "src/product/infrastructure/mapper/ProductMapper";
import { ProductEntity } from "src/product/infrastructure/entity/ProductEntity";

import { Product } from "src/product/domain/Product";
import { ProductRepository } from "src/product/domain/ProductRepository";

export class ProductRepositoryImplement implements ProductRepository {
  @Inject() private readonly productMapper: ProductMapper;

  newId(): string {
    return new EntityId().toString();
  }

  async save(product: Product): Promise<void> {
    await getRepository(ProductEntity).save(
      this.productMapper.modelToEntity(product),
    );
  }

  async findById(id: string): Promise<Product | null> {
    return await getRepository(ProductEntity)
      .findOne(id)
      .then((entity) =>
        entity != null ? this.productMapper.entityToModel(entity) : null,
      );
  }
}
