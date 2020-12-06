/// <reference types="node" />
/**
 * Class for controlling HTTP requests.
 *
 * @since 0.1.0
 */
export class Server extends Router {
    /**
     * @param {number} [port]
     */
    constructor(port?: number | undefined);
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
     * @param {number} port
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
     * @param {string} endpoint
     * @param {Router} router
     */
    route(endpoint: string, router: Router): void;
    #private;
}
export type Socket = import("net").Socket;
export type Method = "CONNECT" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";
export type RouterTree = {
    [Endpoint: string]: Router;
};
import { Router } from "./Router.js";
