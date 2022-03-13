import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { DeleteProductCommand } from "src/product/application/command/DeleteProductCommand";
import { InjectionToken } from "src/product/application/InjectionToken";

import { ProductRepository } from "src/product/domain/ProductRepository";

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand, string>
{
  @Inject(InjectionToken.PRODUCT_REPOSITORY)
  private readonly productRepository: ProductRepository;

  async execute(command: DeleteProductCommand): Promise<string> {
    const product = await this.productRepository.findById(command.id);
    if (product == null) throw new NotFoundException();

    product.delete();

    await this.productRepository.save(product);

    product.commit();

    return command.id;
  }
}
