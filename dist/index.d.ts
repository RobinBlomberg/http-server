export type Chunk = string | Buffer;
export type Headers = {
    [HeaderName: string]: string | number | string[];
};
export type Method = "CONNECT" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";
export type Parameters = {
    [ParameterName: string]: string;
};
export type RequestHandlersPayload = (string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./lib/types.js").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./lib/types.js").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("./lib/Request.js").Request) => import("./lib/types.js").Promiseable<import("./lib/types.js").Response>) | import("./lib/types.js").RequestHandlersPayload | null)[];
export type RequestHandlerTree = {
    children: {
        [Directory: string]: import("./lib/types.js").RequestHandlerTree;
    };
    methods: {
        CONNECT?: import("./lib/types.js").RequestHandler[] | undefined;
        DELETE?: import("./lib/types.js").RequestHandler[] | undefined;
        GET?: import("./lib/types.js").RequestHandler[] | undefined;
        HEAD?: import("./lib/types.js").RequestHandler[] | undefined;
        OPTIONS?: import("./lib/types.js").RequestHandler[] | undefined;
        PATCH?: import("./lib/types.js").RequestHandler[] | undefined;
        POST?: import("./lib/types.js").RequestHandler[] | undefined;
        PUT?: import("./lib/types.js").RequestHandler[] | undefined;
        TRACE?: import("./lib/types.js").RequestHandler[] | undefined;
    };
    name: string | null;
};
export type RequestHandler = string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./lib/types.js").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./lib/types.js").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("./lib/Request.js").Request) => import("./lib/types.js").Promiseable<import("./lib/types.js").Response>) | null;
export type Response = string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./lib/types.js").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./lib/types.js").StatusCode;
        message?: string | undefined;
    } | undefined;
} | null;
export type ResponseStatus = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
    code: import("./lib/types.js").StatusCode;
    message?: string | undefined;
};
export type RouteMatch = {
    handlers: import("./lib/types.js").RequestHandler[];
    parameters: import("./lib/types.js").Parameters;
} | null;
export type StatusCode = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
/**
 * <T>
 */
export type Promiseable<T> = T | Promise<T>;
export { Router, Server } from "./lib/index.js";
