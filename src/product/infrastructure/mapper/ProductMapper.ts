import { Inject } from "@nestjs/common";

import { EntityIdTransformer } from "libs/EntityIdTransformer";

import { ProductEntity } from "src/product/infrastructure/entity/ProductEntity";

import { Product } from "src/product/domain/Product";
import { ProductFactory } from "src/product/domain/ProductFactory";

type ProductProperties = Omit<ProductEntity, "id"> & { id: string };

export class ProductMapper {
  @Inject() private readonly productFactory: ProductFactory;
  @Inject() private readonly entityIdTransformer: EntityIdTransformer;

  modelToEntity(model: Product): ProductEntity {
    const properties: ProductProperties = JSON.parse(JSON.stringify(model));
    return { ...properties, id: this.entityIdTransformer.to(properties.id) };
  }

  entityToModel(entity: ProductEntity): Product {
    return this.productFactory.reconstitute(
      this.entityIdTransformer.from(entity.id),
      entity.title,
      entity.creatorId,
      entity.imageFileId,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
      entity.version,
    );
  }
}
