import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { UpdateProductCommand } from "src/product/application/command/UpdateProductCommand";
import { InjectionToken } from "src/product/application/InjectionToken";

import { ProductRepository } from "src/product/domain/ProductRepository";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand, string>
{
  @Inject(InjectionToken.PRODUCT_REPOSITORY)
  private readonly productRepository: ProductRepository;

  async execute({
    id,
    title,
    imageFileId,
  }: UpdateProductCommand): Promise<string> {
    const product = await this.productRepository.findById(id);
    if (product == null) throw new NotFoundException();
    product.update(title, imageFileId);
    await this.productRepository.save(product);
    product.commit();
    return id;
  }
}
