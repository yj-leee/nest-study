import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateProductCommand } from "src/product/application/command/CreateProductCommand";
import { InjectionToken } from "src/product/application/InjectionToken";

import { ProductFactory } from "src/product/domain/ProductFactory";
import { ProductRepository } from "src/product/domain/ProductRepository";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, string>
{
  @Inject() private readonly productFactory: ProductFactory;
  @Inject(InjectionToken.PRODUCT_REPOSITORY)
  private readonly productRepository: ProductRepository;

  async execute({
    title,
    creatorId,
    imageFileId,
  }: CreateProductCommand): Promise<string> {
    const id = this.productRepository.newId();
    const product = this.productFactory.create(
      id,
      title,
      creatorId,
      imageFileId
    );
    await this.productRepository.save(product);
    product.commit();
    return id;
  }
}
