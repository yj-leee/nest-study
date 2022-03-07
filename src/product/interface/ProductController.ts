import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
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

import { CreateProductCommand } from "src/product/application/command/CreateProductCommand";
import { UpdateProductCommand } from "src/product/application/command/UpdateProductCommand";
import { DeleteProductCommand } from "src/product/application/command/DeleteProductCommand";

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
      dto.name,
      dto.price,
      dto.chipQuantity,
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
    const command = new UpdateProductCommand(id, dto.name, dto.price);
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
}
