import { Request } from './src/Request.js';

export class Server {
  close(): void;
  connect(url: string, ...handlers: RequestHandlersPayload): void;
  delete(url: string, ...handlers: RequestHandlersPayload): void;
  get(url: string, ...handlers: RequestHandlersPayload): void;
  head(url: string, ...handlers: RequestHandlersPayload): void;
  listen(port: number): void;
  on(method: Method, url: string, ...handlers: RequestHandlersPayload): void;
  options(url: string, ...handlers: RequestHandlersPayload): void;
  patch(url: string, ...handlers: RequestHandlersPayload): void;
  post(url: string, ...handlers: RequestHandlersPayload): void;
  put(url: string, ...handlers: RequestHandlersPayload): void;
  trace(url: string, ...handlers: RequestHandlersPayload): void;
}

export type Chunk = string | Buffer;

export type Headers = {
  [HeaderName: string]: number | string | string[];
};

export type Parameters = {
  [ParameterName: string]: string;
};

export type RequestHandlersPayload = (RequestHandler | RequestHandlersPayload)[];

export type RequestHandlerTree = {
  children: {
    [Directory: string]: RequestHandlerTree;
  };
  methods: {
    CONNECT?: RequestHandler[];
    DELETE?: RequestHandler[];
    GET?: RequestHandler[];
    HEAD?: RequestHandler[];
    OPTIONS?: RequestHandler[];
    PATCH?: RequestHandler[];
    POST?: RequestHandler[];
    PUT?: RequestHandler[];
    TRACE?: RequestHandler[];
  };
  name: string | null;
};

export type RouteMatch = {
  handlers: RequestHandler[];
  parameters: Parameters;
} | null;

/**
 * @see https://tools.ietf.org/html/rfc2616
 * @see https://tools.ietf.org/html/rfc5789
 */
export type Method =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE';

export type Promiseable<T> = T | Promise<T>;

export type RequestHandler =
  | Response
  | ((req: Request) => Promiseable<Response>);

export type Response =
  | void
  | null
  | boolean
  | string
  | {
    body?: string;
    file?: string;
    headers?: Headers;
    next?: boolean;
    status?: ResponseStatus;
  };

export type ResponseStatus =
  | StatusCode
  | {
    code: StatusCode;
    message?: string;
  };

export type StatusCode =
  | 100 | 101 | 102 | 103
  | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226
  | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308
  | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415
  | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451
  | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
