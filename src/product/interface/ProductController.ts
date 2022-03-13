import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateProductRequestDto } from "src/product/interface/dto/CreateProductRequestDto";
import { CreateProductResponseDto } from "src/product/interface/dto/CreateProductResponseDto";
import { DeleteProductRequestParam } from "src/product/interface/dto/DeleteProductRequestParam";
import { UpdateProductRequestDto } from "src/product/interface/dto/UpdateProductRequestDto";
import { UpdateProductRequestParam } from "src/product/interface/dto/UpdateProductRequestParam";
import { UpdateProductResponseDto } from "src/product/interface/dto/UpdateProductResponseDto";
import { FindProductByIdRequestParam } from "src/product/interface/dto/FindProductByIdRequestParam";
import { FindProductByIdResponseDto } from "src/product/interface/dto/FindProductByIdResponseDto";
import { FindProductRequestQueryString } from "src/product/interface/dto/FindProductRequestQueryString";
import { FindProductResponseDto } from "src/product/interface/dto/FindProductResponseDto";

import { CreateProductCommand } from "src/product/application/command/CreateProductCommand";
import { UpdateProductCommand } from "src/product/application/command/UpdateProductCommand";
import { DeleteProductCommand } from "src/product/application/command/DeleteProductCommand";
import { FindProductByIdQuery } from "src/product/application/query/FindProductByIdQuery";
import { FindProductByIdResult } from "src/product/application/query/FindProductByIdResult";
import { FindProductQuery } from "src/product/application/query/FindProductQuery";
import { FindProductResult } from "src/product/application/query/FindProductResult";

@ApiTags("Product")
@Controller("products")
export class ProductController {
  @Inject() private readonly commandBus: CommandBus;
  @Inject() private readonly queryBus: QueryBus;

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: CreateProductResponseDto })
  async create(
    @Body() dto: CreateProductRequestDto,
  ): Promise<CreateProductResponseDto> {
    const command = new CreateProductCommand(
      dto.title,
      dto.creatorId,
      dto.imageFileId,
    );
    const result: string = await this.commandBus.execute(command);
    const responseDto: CreateProductResponseDto = { id: result };
    return responseDto;
  }

  @Put(":id")
  @HttpCode(200)
  @ApiOkResponse({ type: UpdateProductResponseDto })
  async update(
    @Param() { id }: UpdateProductRequestParam,
    @Body() dto: UpdateProductRequestDto,
  ): Promise<UpdateProductResponseDto> {
    const command = new UpdateProductCommand(id, dto.title, dto.imageFileId);
    const result: string = await this.commandBus.execute(command);
    const responseDto: UpdateProductResponseDto = { id: result };
    return responseDto;
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiNoContentResponse()
  async delete(@Param() { id }: DeleteProductRequestParam): Promise<void> {
    const command = new DeleteProductCommand(id);
    await this.commandBus.execute(command);
  }

  @Get()
  @ApiOkResponse({ type: FindProductResponseDto })
  async find(
    @Query() { offset, limit }: FindProductRequestQueryString,
  ): Promise<FindProductResponseDto> {
    const query = new FindProductQuery(offset, limit);
    const result: FindProductResult = await this.queryBus.execute(query);
    return { products: result };
  }

  @Get(":id")
  @ApiOkResponse({ type: FindProductByIdResponseDto })
  async findById(
    @Param() { id }: FindProductByIdRequestParam,
  ): Promise<FindProductByIdResponseDto> {
    const query = new FindProductByIdQuery(id);
    const result: FindProductByIdResult | null = await this.queryBus.execute(
      query,
    );
    if (!result) throw new NotFoundException();
    return result;
  }
}
