/**
 * @typedef {import('net').Socket} Socket
 * @typedef {import('./types').Method} Method
 * @typedef {import('./types').RequestHandler} RequestHandler
 * @typedef {import('./types').RequestHandlerTree} RequestHandlerTree
 * @typedef {import('./types').RequestHandlersPayload} RequestHandlersPayload
 * @typedef {import('./types').RouteMatch} RouteMatch
 */

import { RouteStore } from './RouteStore.js';

/**
 * Class for controlling request handlers.
 *
 * @since 0.2.0
 */
export class Router {
  #routeStore = new RouteStore();

  /**
   * Adds a CONNECT request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  connect(url, ...handlers) {
    this.on('CONNECT', url, ...handlers);
  }

  /**
   * Adds a DELETE request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  delete(url, ...handlers) {
    this.on('DELETE', url, ...handlers);
  }

  /**
   * Finds a request handler by method and URL.
   *
   * @since 0.2.0
   * @param {Method} method
   * @param {string} url
   * @return {RouteMatch}
   */
  find(method, url) {
    return this.#routeStore.find(method, url);
  }

  /**
   * Adds a GET request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  get(url, ...handlers) {
    this.on('GET', url, ...handlers);
  }

  /**
   * Adds a HEAD request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  head(url, ...handlers) {
    this.on('HEAD', url, ...handlers);
  }

  /**
   * Adds a request handler.
   *
   * @since 0.2.0
   * @param {Method} method
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  on(method, url, ...handlers) {
    this.#routeStore.add(method, url, ...handlers);
  }

  /**
   * Adds a OPTIONS request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  options(url, ...handlers) {
    this.on('OPTIONS', url, ...handlers);
  }

  /**
   * Adds a PATCH request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  patch(url, ...handlers) {
    this.on('PATCH', url, ...handlers);
  }

  /**
   * Adds a POST request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  post(url, ...handlers) {
    this.on('POST', url, ...handlers);
  }

  /**
   * Adds a PUT request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  put(url, ...handlers) {
    this.on('PUT', url, ...handlers);
  }

  /**
   * Adds a TRACE request handler.
   *
   * @since 0.2.0
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  trace(url, ...handlers) {
    this.on('TRACE', url, ...handlers);
  }
}
