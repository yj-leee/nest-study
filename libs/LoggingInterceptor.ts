import {
  CallHandler,
  ExecutionContext,
  Inject,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

import { Request } from "libs/Request";
import { RequestLog } from "libs/RequestLog";

export class LoggingInterceptor implements NestInterceptor {
  @Inject() private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        this.logger.log(new RequestLog(request, data));
        return data;
      }),
    );
  }
}
