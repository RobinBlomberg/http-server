/**
 * @typedef {import('net').Socket} Socket
 * @typedef {import('./types').Method} Method
 * @typedef {import('./types').RequestHandler} RequestHandler
 * @typedef {import('./types').RequestHandlerTree} RequestHandlerTree
 * @typedef {import('./types').RequestHandlersPayload} RequestHandlersPayload
 * @typedef {import('./types').RouteMatch} RouteMatch
 */

import { RouteStore } from './routeStore.js';

/**
 * Class for controlling request handlers.
 *
 * @since 0.2.0
 */
export class Router {
  /** @type {RequestHandler[]} */
  #middleware = [];

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
   * All router middleware are prepended to the request handler array.
   *
   * @since 0.2.0
   * @param {Method} method
   * @param {string} url
   * @return {RouteMatch}
   */
  find(method, url) {
    const match = this.#routeStore.find(method, url);
    return match
      ? {
        handlers: [...this.#middleware, ...match.handlers],
        parameters: match.parameters
      }
      : null;
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

  /**
   * Adds request handler middleware.
   * These will be executed in order for every router request.
   *
   * @since 0.3.0
   * @param {RequestHandlersPayload} handlers
   */
  use(...handlers) {
    this.#middleware.push(...handlers.flat(Infinity));
  }
}
