import { ICommand } from "@nestjs/cqrs";

export class UpdateProductCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly title: string | null,
    readonly imageFileId: string | null,
  ) {}
}
