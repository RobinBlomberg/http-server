/**
 * @typedef {import('net').Socket} Socket
 * @typedef {import('../types').Method} Method
 * @typedef {import('../types').RequestHandler} RequestHandler
 * @typedef {import('../types').RequestHandlerTree} RequestHandlerTree
 * @typedef {import('../types').RequestHandlersPayload} RequestHandlersPayload
 */
import * as Http from 'http';
import { Request } from './Request.js';
import { Response } from './Response.js';
import { Router } from './Router.js';

/**
 * Handles all HTTP requests.
 */
export class Server {
  #router = new Router();

  /** @type {Http.Server | undefined} */
  #server;

  /** @type {Set<Socket>} */
  #sockets = new Set();

  /**
   * @param {number} [port]
   */
  constructor(port) {
    if (port !== undefined) {
      this.listen(port);
    }
  }

  /**
   * Closes the server and destroys all connected sockets.
   */
  close() {
    this.#server?.close(() => {
      for (const socket of this.#sockets) {
        socket.destroy();
      }
    });
  }

  /**
   * Add a CONNECT request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  connect(url, ...handlers) {
    this.on('CONNECT', url, ...handlers);
  }

  /**
   * Add a DELETE request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  delete(url, ...handlers) {
    this.on('DELETE', url, ...handlers);
  }

  /**
   * Add a GET request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  get(url, ...handlers) {
    this.on('GET', url, ...handlers);
  }

  /**
   * Add a HEAD request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  head(url, ...handlers) {
    this.on('HEAD', url, ...handlers);
  }

  /**
   * Start handling all HTTP requests on a specific port.
   *
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
        const routeMatch = this.#router.find(method, url);

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
   * Add a request handler.
   *
   * @param {Method} method
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  on(method, url, ...handlers) {
    this.#router.add(method, url, ...handlers);
  }

  /**
   * Add a OPTIONS request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  options(url, ...handlers) {
    this.on('OPTIONS', url, ...handlers);
  }

  /**
   * Add a PATCH request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  patch(url, ...handlers) {
    this.on('PATCH', url, ...handlers);
  }

  /**
   * Add a POST request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  post(url, ...handlers) {
    this.on('POST', url, ...handlers);
  }

  /**
   * Add a PUT request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  put(url, ...handlers) {
    this.on('PUT', url, ...handlers);
  }

  /**
   * Add a TRACE request handler.
   *
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  trace(url, ...handlers) {
    this.on('TRACE', url, ...handlers);
  }
}
