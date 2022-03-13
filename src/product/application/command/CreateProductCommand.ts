import { ICommand } from "@nestjs/cqrs";

export class CreateProductCommand implements ICommand {
  constructor(
    readonly title: string,
    readonly creatorId: string,
    readonly imageFileId: string,
  ) {}
}
