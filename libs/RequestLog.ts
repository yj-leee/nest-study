import { Request } from "libs/Request";

export class RequestLog extends String {
  constructor(readonly request: Request, readonly responseBody: object) {
    super(
      JSON.stringify({
        request: request.method + " " + request.url,
        requestId: request.requestId,
        user: request.user,
        response: responseBody,
      })
    );
  }
}
