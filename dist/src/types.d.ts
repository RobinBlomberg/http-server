/// <reference types="node" />
import { Request } from './Request.js';
export declare type Chunk = string | Buffer;
export declare type Headers = {
    [HeaderName: string]: number | string | string[];
};
/**
 * @see https://tools.ietf.org/html/rfc2616
 * @see https://tools.ietf.org/html/rfc5789
 */
export declare type Method = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
export declare type Parameters = {
    [ParameterName: string]: string;
};
export declare type Promiseable<T> = T | Promise<T>;
export declare type RequestHandlerTree = {
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
export declare type RequestHandlersPayload = (RequestHandler | RequestHandlersPayload)[];
export declare type RequestHandler = Response | ((req: Request) => Promiseable<Response>);
export declare type Response = void | null | boolean | string | {
    body?: string;
    file?: string;
    headers?: Headers;
    next?: boolean;
    status?: ResponseStatus;
};
export declare type ResponseStatus = StatusCode | {
    code: StatusCode;
    message?: string;
};
export declare type RouteMatch = {
    handlers: RequestHandler[];
    parameters: Parameters;
} | null;
export declare type StatusCode = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
