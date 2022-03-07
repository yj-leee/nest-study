import { AggregateRoot } from "@nestjs/cqrs";

import { ProductDeletedEvent } from "src/product/domain/event/ProductDeletedEvent";
import { ProductUpdatedEvent } from "src/product/domain/event/ProductUpdatedEvent";

export class Product extends AggregateRoot {
  constructor(
    private readonly id: string,
    private title: string,
    private readonly creatorId: string,
    private imageFileId: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private deletedAt: Date | null,
    private version: number,
  ) {
    super();
  }

  update(title: string | null, imageFileId: string | null): void {
    this.title = title ?? this.title;
    this.imageFileId = imageFileId ?? this.imageFileId;
    this.updatedAt = new Date();
    this.version += 1;
    this.apply(new ProductUpdatedEvent(this.id));
  }

  delete(): void {
    this.deletedAt = new Date();
    this.version += 1;
    this.apply(new ProductDeletedEvent(this.id));
  }
}
