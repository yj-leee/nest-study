import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { EntityIdTransformer } from "libs/EntityIdTransformer";

import { ProductMapper } from "src/product/infrastructure/mapper/ProductMapper";
import { ProductRepositoryImplement } from "src/product/infrastructure/repository/ProductRepositoryImplement";
import { ProductQueryImplement } from "src/product/infrastructure/query/ProductQueryImplement";

import { ProductController } from "src/product/interface/ProductController";

import { CreateProductHandler } from "src/product/application/command/CreateProductHandler";
import { DeleteProductHandler } from "src/product/application/command/DeleteProductHandler";
import { UpdateProductHandler } from "src/product/application/command/UpdateProductHandler";
import { InjectionToken } from "src/product/application/InjectionToken";
import { FindProductHandler } from "src/product/application/query/FindProductHandler";
import { FindProductByIdHandler } from "src/product/application/query/FindProductByIdHandler";

import { ProductFactory } from "src/product/domain/ProductFactory";

const infrastructure: Provider[] = [
  ProductMapper,
  {
    provide: InjectionToken.PRODUCT_REPOSITORY,
    useClass: ProductRepositoryImplement,
  },
  {
    provide: InjectionToken.PRODUCT_QUERY,
    useClass: ProductQueryImplement,
  },
  EntityIdTransformer,
];

const application: Provider[] = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  FindProductHandler,
  FindProductByIdHandler,
];

const domain: Provider[] = [ProductFactory];

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [...infrastructure, ...application, ...domain],
})
export class ProductModule {}
