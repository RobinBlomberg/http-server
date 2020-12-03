export { Server } from "./src/index.js";
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
    headers?: import("./src/types.js").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./src/types.js").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("./src/Request.js").Request) => import("./src/types.js").Promiseable<import("./src/types.js").Response>) | import("./src/types.js").RequestHandlersPayload | null)[];
export type RequestHandlerTree = {
    children: {
        [Directory: string]: import("./src/types.js").RequestHandlerTree;
    };
    methods: {
        CONNECT?: import("./src/types.js").RequestHandler[] | undefined;
        DELETE?: import("./src/types.js").RequestHandler[] | undefined;
        GET?: import("./src/types.js").RequestHandler[] | undefined;
        HEAD?: import("./src/types.js").RequestHandler[] | undefined;
        OPTIONS?: import("./src/types.js").RequestHandler[] | undefined;
        PATCH?: import("./src/types.js").RequestHandler[] | undefined;
        POST?: import("./src/types.js").RequestHandler[] | undefined;
        PUT?: import("./src/types.js").RequestHandler[] | undefined;
        TRACE?: import("./src/types.js").RequestHandler[] | undefined;
    };
    name: string | null;
};
export type RequestHandler = string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./src/types.js").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./src/types.js").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("./src/Request.js").Request) => import("./src/types.js").Promiseable<import("./src/types.js").Response>) | null;
export type Response = string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./src/types.js").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./src/types.js").StatusCode;
        message?: string | undefined;
    } | undefined;
} | null;
export type ResponseStatus = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
    code: import("./src/types.js").StatusCode;
    message?: string | undefined;
};
export type RouteMatch = {
    handlers: import("./src/types.js").RequestHandler[];
    parameters: import("./src/types.js").Parameters;
} | null;
export type StatusCode = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
/**
 * <T>
 */
export type Promiseable<T> = T | Promise<T>;
