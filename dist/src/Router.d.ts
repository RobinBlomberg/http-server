/// <reference types="node" />
/**
 * Class for controlling request handlers.
 */
export class Router {
    /**
     * Add a CONNECT request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    connect(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * Add a DELETE request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    delete(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * @param {Method} method
     * @param {string} url
     * @return {RouteMatch}
     */
    find(method: Method, url: string): RouteMatch;
    /**
     * Add a GET request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    get(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * Add a HEAD request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    head(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * Add a request handler.
     *
     * @param {Method} method
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    on(method: Method, url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * Add a OPTIONS request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    options(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * Add a PATCH request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    patch(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * Add a POST request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    post(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * Add a PUT request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    put(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    /**
     * Add a TRACE request handler.
     *
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    trace(url: string, ...handlers: import("./types.js").RequestHandlersPayload): void;
    #private;
}
export type Socket = import("net").Socket;
export type Method = "CONNECT" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";
export type RequestHandler = string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./types.js").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./types.js").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("./Request.js").Request) => import("./types.js").Promiseable<import("./types.js").Response>) | null;
export type RequestHandlerTree = {
    children: {
        [Directory: string]: import("./types.js").RequestHandlerTree;
    };
    methods: {
        CONNECT?: import("./types.js").RequestHandler[] | undefined;
        DELETE?: import("./types.js").RequestHandler[] | undefined;
        GET?: import("./types.js").RequestHandler[] | undefined;
        HEAD?: import("./types.js").RequestHandler[] | undefined;
        OPTIONS?: import("./types.js").RequestHandler[] | undefined;
        PATCH?: import("./types.js").RequestHandler[] | undefined;
        POST?: import("./types.js").RequestHandler[] | undefined;
        PUT?: import("./types.js").RequestHandler[] | undefined;
        TRACE?: import("./types.js").RequestHandler[] | undefined;
    };
    name: string | null;
};
export type RequestHandlersPayload = (string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./types.js").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./types.js").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("./Request.js").Request) => import("./types.js").Promiseable<import("./types.js").Response>) | import("./types.js").RequestHandlersPayload | null)[];
export type RouteMatch = {
    handlers: import("./types.js").RequestHandler[];
    parameters: import("./types.js").Parameters;
} | null;
