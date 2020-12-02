/// <reference types="node" />
/**
 * A HTTP IncomingMessage wrapper.
 */
export class Request extends Stream {
    /**
     * @param {Http.IncomingMessage} incomingMessage The original Node.js HTTP request.
     * @param {Parameters} parameters The URL parameters, (e.g. "/User/:userId" -> { userId: "378" }).
     */
    constructor(incomingMessage: Http.IncomingMessage, parameters: Parameters);
    /** @type {Headers} */
    headers: Headers;
    /** @type {Method} */
    method: Method;
    /** @type {string} */
    url: string;
    /** @type {Parameters} */
    parameters: Parameters;
    /**
     * @param {string} name
     * @return {string | number | string[] | undefined}
     */
    get(name: string): string | number | string[] | undefined;
    /**
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
