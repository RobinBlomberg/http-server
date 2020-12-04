/// <reference types="node" />
/**
 * A HTTP response wrapper.
 *
 * @since 0.1.0
 */
export class Response {
    /**
     * @param {Http.IncomingMessage} req
     * @param {Http.ServerResponse} res
     */
    constructor(req: Http.IncomingMessage, res: Http.ServerResponse);
    /**
     * @private
     * @param {Chunk | undefined} chunk
     * @param {boolean} isTimestampETag
     * @return {string}
     */
    private _createStrongETag;
    /**
     * @private
     * @param {ErrnoException} exception
     */
    private _handleSendFileError;
    /**
     * @private
     */
    private _writeHeaders;
    /**
     * Sends the response to the client.
     *
     * @since 0.1.0
     * @param {Chunk | undefined} [chunk]
     */
    end(chunk?: Chunk | undefined): void;
    /**
     * Sends a file to the client.
     *
     * @since 0.1.0
     * @param {string} path
     */
    sendFile(path: string): Promise<void>;
    /**
     * Sets a single header.
     *
     * @since 0.1.0
     * @param {string} name
     * @param {number | string} value
     * @return {Response}
     */
    setHeader(name: string, value: number | string): Response;
    /**
     * Assigns headers to the response.
     *
     * @since 0.1.0
     * @param {Headers} headers
     * @return {Response}
     */
    setHeaders(headers: Headers): Response;
    /**
     * Sets the response HTTP status.
     *
     * @since 0.1.0
     * @param {StatusCode} statusCode
     * @param {string} [statusMessage]
     * @return {Response}
     */
    setStatus(statusCode: StatusCode, statusMessage?: string | undefined): Response;
    /**
     * Sends a chunk to the client. Sends all cached headers if they have not been sent.
     *
     * @since 0.1.0
     * @param {Chunk | undefined} chunk
     * @return {Response}
     */
    write(chunk: Chunk | undefined): Response;
    #private;
}
export type ErrnoException = NodeJS.ErrnoException;
export type Chunk = string | Buffer;
export type Headers = {
    [HeaderName: string]: string | number | string[];
};
export type StatusCode = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
import * as Http from "http";
