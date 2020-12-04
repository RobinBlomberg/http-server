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
 */
export class Router {
  #routeStore = new RouteStore();

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
   * @param {Method} method
   * @param {string} url
   * @return {RouteMatch}
   */
  find(method, url) {
    return this.#routeStore.find(method, url);
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
   * Add a request handler.
   *
   * @param {Method} method
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  on(method, url, ...handlers) {
    this.#routeStore.add(method, url, ...handlers);
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
