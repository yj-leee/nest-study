import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";

import { ProductCreatedEvent } from "src/product/domain/event/ProductCreatedEvent";
import { Product } from "src/product/domain/Product";

export class ProductFactory {
  @Inject() private readonly eventPublisher: EventPublisher;

  create(
    id: string,
    title: string,
    creatorId: string,
    imageFileId: string,
  ): Product {
    const product = new Product(
      id,
      title,
      creatorId,
      imageFileId,
      new Date(),
      new Date(),
      null,
      0,
    );
    product.apply(new ProductCreatedEvent(id));
    return this.eventPublisher.mergeObjectContext(product);
  }

  reconstitute(
    id: string,
    title: string,
    creatorId: string,
    imageFileId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
    version: number,
  ): Product {
    const product = new Product(
      id,
      title,
      creatorId,
      imageFileId,
      createdAt,
      updatedAt,
      deletedAt,
      version,
    );
    return this.eventPublisher.mergeObjectContext(product);
  }
}
