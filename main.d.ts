import * as Http from 'http';
import { Stream } from '@robinblomberg/stream';

/*
 * Internal types
 * -------------------------------------------------------------------------------------------------
 */

export type Chunk = string | Buffer;

export type Headers = {
  [HeaderName: string]: number | string | string[];
};

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

export type Parameters = {
  [ParameterName: string]: string;
};

export type Promiseable<T> = T | Promise<T>;

export class Request extends Stream {
  /**
   * @since 0.1.0
   */
  headers: Headers;

  /**
   * @since 0.1.0
   */
  method: Method;

  /**
   * @since 0.1.0
   */
  url: string;

  /**
   * @since 0.1.0
   */
  parameters: Parameters;

  constructor(incomingMessage: Http.IncomingMessage, parameters: Parameters);

  /**
   * Gets a header.
   *
   * @since 0.1.0
   */
  get(name: string): string | number | string[] | undefined;

  /**
   * Checks whether a specified header exists.
   *
   * @since 0.1.0
   */
  has(name: string): boolean;
}

export type RequestHandlerTree = {
  children: {
    [Directory: string]: RequestHandlerTree;
  };
  methods: {
    /* eslint-disable @typescript-eslint/naming-convention */
    CONNECT?: RequestHandler[];
    DELETE?: RequestHandler[];
    GET?: RequestHandler[];
    HEAD?: RequestHandler[];
    OPTIONS?: RequestHandler[];
    PATCH?: RequestHandler[];
    POST?: RequestHandler[];
    PUT?: RequestHandler[];
    TRACE?: RequestHandler[];
    /* eslint-enable @typescript-eslint/naming-convention */
  };
  name: string | null;
};

export type RequestHandlersPayload = (RequestHandler | RequestHandlersPayload)[];

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

export type RouteMatch = {
  handlers: RequestHandler[];
  parameters: Parameters;
} | null;

export type RouterTree = {
  [Endpoint: string]: Router;
};

export type StatusCode =
  | 100 | 101 | 102 | 103
  | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226
  | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308
  | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415
  | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451
  | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

/*
 * External types
 * -------------------------------------------------------------------------------------------------
 */

/**
 * Class for controlling request handlers.
 *
 * @since 0.2.0
 */
export class Router {
  /**
   * Adds a CONNECT request handler.
   *
   * @since 0.2.0
   */
  connect(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds a DELETE request handler.
   *
   * @since 0.2.0
   */
  delete(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Finds a request handler by method and URL.
   * All router middleware are prepended to the request handler array.
   *
   * @since 0.2.0
   */
  find(method: Method, url: string): RouteMatch;

  /**
   * Adds a GET request handler.
   *
   * @since 0.2.0
   */
  get(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds a HEAD request handler.
   *
   * @since 0.2.0
   */
  head(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds a request handler.
   *
   * @since 0.2.0
   */
  on(method: Method, url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds a OPTIONS request handler.
   *
   * @since 0.2.0
   */
  options(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds a PATCH request handler.
   *
   * @since 0.2.0
   */
  patch(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds a POST request handler.
   *
   * @since 0.2.0
   */
  post(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds a PUT request handler.
   *
   * @since 0.2.0
   */
  put(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds a TRACE request handler.
   *
   * @since 0.2.0
   */
  trace(url: string, ...handlers: RequestHandlersPayload): void;

  /**
   * Adds request handler middleware.
   * These will be executed in order for every router request.
   *
   * @since 0.3.0
   */
  use(...handlers: RequestHandlersPayload): void;
}

/**
 * Class for controlling HTTP requests.
 *
 * @since 0.1.0
 */
export class Server extends Router {
  constructor(port: number);

  /**
   * Closes the server and destroys all connected sockets.
   *
   * @since 0.1.0
   */
  close(): void;

  /**
   * Starts handling all HTTP requests on a specific port.
   *
   * @since 0.1.0
   * @example
   * const httpServer = new HttpServer();
   *
   * httpServer.listen(3000);
   */
  listen(port: number): void;

  /**
   * Adds a router to a URL endpoint.
   *
   * @since 0.2.0
   */
  route(endpoint: string, router: Router): void;
}
