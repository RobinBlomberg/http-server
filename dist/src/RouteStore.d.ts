/**
 * Handles request handler storage and retrieval.
 */
export class RouteStore {
    /**
     * Add a request handler.
     *
     * @param {Method} method
     * @param {string} url
     * @param {RequestHandlersPayload} handlers
     */
    add(method: Method, url: string, ...handlers: import("./types").RequestHandlersPayload): void;
    /**
     * @param {Method} method
     * @param {string} url
     * @return {RouteMatch}
     */
    find(method: Method, url: string): RouteMatch;
    #private;
}
export type Method = "CONNECT" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";
export type Parameters = {
    [ParameterName: string]: string;
};
export type RequestHandler = string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./types").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./types").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("./Request").Request) => import("./types").Promiseable<import("./types").Response>) | null;
export type RequestHandlersPayload = (string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("./types").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("./types").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("./Request").Request) => import("./types").Promiseable<import("./types").Response>) | import("./types").RequestHandlersPayload | null)[];
export type RequestHandlerTree = {
    children: {
        [Directory: string]: import("./types").RequestHandlerTree;
    };
    methods: {
        CONNECT?: import("./types").RequestHandler[] | undefined;
        DELETE?: import("./types").RequestHandler[] | undefined;
        GET?: import("./types").RequestHandler[] | undefined;
        HEAD?: import("./types").RequestHandler[] | undefined;
        OPTIONS?: import("./types").RequestHandler[] | undefined;
        PATCH?: import("./types").RequestHandler[] | undefined;
        POST?: import("./types").RequestHandler[] | undefined;
        PUT?: import("./types").RequestHandler[] | undefined;
        TRACE?: import("./types").RequestHandler[] | undefined;
    };
    name: string | null;
};
export type RouteMatch = {
    handlers: import("./types").RequestHandler[];
    parameters: import("./types").Parameters;
} | null;
