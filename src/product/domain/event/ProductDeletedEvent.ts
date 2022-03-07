import { IEvent } from "@nestjs/cqrs";

export class ProductDeletedEvent implements IEvent {
  constructor(readonly id: string) {}
}
