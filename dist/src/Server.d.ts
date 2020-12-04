/// <reference types="node" />
/**
 * Class for controlling HTTP requests.
 */
export class Server extends Router {
    /**
     * @param {number} [port]
     */
    constructor(port?: number | undefined);
    /**
     * Close the server and destroys all connected sockets.
     */
    close(): void;
    /**
     * Start handling all HTTP requests on a specific port.
     *
     * @param {number} port
     * @example
     * const httpServer = new HttpServer();
     *
     * httpServer.listen(3000);
     */
    listen(port: number): void;
    /**
     * Add a router to a URL endpoint.
     *
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
