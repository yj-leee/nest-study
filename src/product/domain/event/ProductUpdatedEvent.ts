import { IEvent } from "@nestjs/cqrs";

export class ProductUpdatedEvent implements IEvent {
  constructor(readonly id: string) {}
}
