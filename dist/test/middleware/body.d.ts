export function body(schema: Schema): RequestHandler;
export type RequestHandler = string | boolean | void | {
    body?: string | undefined;
    file?: string | undefined;
    headers?: import("../../src/types").Headers | undefined;
    next?: boolean | undefined;
    status?: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | {
        code: import("../../src/types").StatusCode;
        message?: string | undefined;
    } | undefined;
} | ((req: import("../../src/Request").Request) => import("../../src/types").Promiseable<import("../../src/types").Response>) | null;
export type Schema = import("@robinblomberg/schema/dist/src/types").Schema;
