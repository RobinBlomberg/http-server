/**
 * @typedef {import('net').Socket} Socket
 * @typedef {import('./types').Method} Method
 * @typedef {import('./types').RouterTree} RouterTree
 */

import * as Http from 'http';
import { Request } from './Request.js';
import { Response } from './Response.js';
import { Router } from './Router.js';

/**
 * Class for controlling HTTP requests.
 *
 * @since 0.1.0
 */
export class Server extends Router {
  /** @type {RouterTree} */
  #routers = {};

  /** @type {Http.Server | undefined} */
  #server;

  /** @type {Set<Socket>} */
  #sockets = new Set();

  /**
   * @param {number} [port]
   */
  constructor(port) {
    super();

    if (port !== undefined) {
      this.listen(port);
    }
  }

  /**
   * Closes the server and destroys all connected sockets.
   *
   * @since 0.1.0
   */
  close() {
    this.#server?.close(() => {
      for (const socket of this.#sockets) {
        socket.destroy();
      }
    });
  }

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
  listen(port) {
    this.#server = Http.createServer(async(incomingMessage, serverResponse) => {
      try {
        const method = /** @type {Method} */ (incomingMessage.method);
        const url = /** @type {string} */ (incomingMessage.url);
        let routeMatch = this.find(method, url);

        if (!routeMatch) {
          for (const endpoint in this.#routers) {
            if (
              Object.prototype.hasOwnProperty.call(this.#routers, endpoint) &&
              url.startsWith(endpoint)
            ) {
              const router = this.#routers[endpoint];

              routeMatch = router.find(method, url.slice(endpoint.length));

              if (routeMatch) {
                break;
              }
            }
          }
        }

        if (routeMatch) {
          const { handlers, parameters } = routeMatch;
          const req = new Request(incomingMessage, parameters);
          const res = new Response(incomingMessage, serverResponse);

          for (const handler of handlers) {
            const response = typeof handler === 'function'
              ? await handler(req)
              : handler;

            if (typeof response === 'string') {
              res.end(response);
              return;
            } else if (!response) {
              res.end();
              return;
            } else if (response === true) {
              // Continue to the next handler.
            } else if (response.file) {
              res.sendFile(response.file);
              return;
            } else {
              if (response.status) {
                if (typeof response.status === 'number') {
                  res.setStatus(response.status);
                } else {
                  res.setStatus(response.status.code, response.status.message);
                }
              }

              if (response.headers) {
                res.setHeaders(response.headers);
              }

              if (response.body) {
                res.end(response.body);
              }

              // Continue to the next handler if the response has a true "next" property.
              if (!response.next) {
                return;
              }
            }
          }
        }
      } catch (ex) {
        console.error(ex);
      }
    });

    this.#server.on('connection', (socket) => {
      this.#sockets.add(socket);

      socket.on('close', () => {
        this.#sockets.delete(socket);
      });
    });

    this.#server.listen(port);
  }

  /**
   * Adds a router to a URL endpoint.
   *
   * @since 0.2.0
   * @param {string} endpoint
   * @param {Router} router
   */
  route(endpoint, router) {
    this.#routers[endpoint] = router;
  }
}
