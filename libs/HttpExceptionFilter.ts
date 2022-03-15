import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  Logger,
} from "@nestjs/common";
import { Response } from "express";

import { RequestLog } from "libs/RequestLog";
import { Request } from "libs/Request";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  @Inject() private readonly logger = new Logger(HttpException.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    this.logger.error(
      new RequestLog(request, exception.getResponse() as object),
    );
    response.status(exception.getStatus()).json(exception.getResponse());
  }
}
