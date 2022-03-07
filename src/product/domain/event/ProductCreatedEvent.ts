import { IEvent } from "@nestjs/cqrs";

export class ProductCreatedEvent implements IEvent {
  constructor(readonly id: string) {}
}
