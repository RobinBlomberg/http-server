/// <reference types="node" />
/**
 * A HTTP IncomingMessage wrapper.
 *
 * @since 0.1.0
 */
export class Request extends Stream {
    /**
     * @param {Http.IncomingMessage} incomingMessage
     * @param {Parameters} parameters
     */
    constructor(incomingMessage: Http.IncomingMessage, parameters: Parameters);
    /**
     * @since 0.1.0
     * @type {Headers}
     */
    headers: Headers;
    /**
     * @since 0.1.0
     * @type {Method}
     */
    method: Method;
    /**
     * @since 0.1.0
     * @type {string}
     */
    url: string;
    /**
     * @since 0.1.0
     * @type {Parameters}
     */
    parameters: Parameters;
    /**
     * Gets a header.
     *
     * @since 0.1.0
     * @param {string} name
     * @return {string | number | string[] | undefined}
     */
    get(name: string): string | number | string[] | undefined;
    /**
     * Checks whether a specified header exists.
     *
     * @since 0.1.0
     * @param {string} name
     * @return {boolean}
     */
    has(name: string): boolean;
    #private;
}
export type Headers = {
    [HeaderName: string]: string | number | string[];
};
export type Method = "CONNECT" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";
export type Parameters = {
    [ParameterName: string]: string;
};
import { Stream } from "@robinblomberg/stream";
import * as Http from "http";
