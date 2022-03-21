import { Controller, Get, NotFoundException } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint(true)
  get() {
    throw new NotFoundException();
  }

  @Get("health")
  health() {
    return;
  }

  @Get("favicon.ico")
  @ApiExcludeEndpoint(true)
  favicon() {
    return;
  }

  @Get("/error")
  getError() {
    throw new Error('Hi Sentry!');
  }
}
