/**
 * @typedef {import('./types').Method} Method
 * @typedef {import('./types').Parameters} Parameters
 * @typedef {import('./types').RequestHandler} RequestHandler
 * @typedef {import('./types').RequestHandlersPayload} RequestHandlersPayload
 * @typedef {import('./types').RequestHandlerTree} RequestHandlerTree
 * @typedef {import('./types').RouteMatch} RouteMatch
 */
import { Url } from '@robinblomberg/url';

/**
 * Handles request handler storage and retrieval.
 *
 * @since 0.1.0
 */
export class RouteStore {
  /** @type {RequestHandlerTree} */
  #routes = {
    children: {},
    methods: {},
    name: null
  };

  /**
   * Adds a request handler.
   *
   * @since 0.1.0
   * @param {Method} method
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  add(method, url, ...handlers) {
    const directories = Url.split(url);
    let node = this.#routes;

    for (const directory of directories) {
      const key = directory[0] === ':' ? '*' : directory;
      const name = directory[0] === ':' ? directory.slice(1) : null;

      if (!node.children[key]) {
        node.children[key] = {
          children: {},
          methods: {},
          name
        };
      }

      node = node.children[key];
    }

    node.methods[method] = handlers.flat(Infinity);
  }

  /**
   * Finds a request handler by method and URL.
   *
   * @since 0.1.0
   * @param {Method} method
   * @param {string} url
   * @return {RouteMatch}
   */
  find(method, url) {
    const directories = Url.split(url);
    const parameters = /** @type {Parameters} */ ({});

    let node = this.#routes;

    for (const directory of directories) {
      node = node.children[directory] ?? node.children['*'];

      if (!node) {
        return null;
      } else if (node.name !== null) {
        parameters[node.name] = directory;
      }
    }

    const handlers = node.methods[method];

    return handlers
      ? { handlers, parameters }
      : null;
  }
}
