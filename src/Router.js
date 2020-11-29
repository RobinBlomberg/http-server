/**
 * @typedef {import('../types').Method} Method
 * @typedef {import('../types').Parameters} Parameters
 * @typedef {import('../types').RequestHandler} RequestHandler
 * @typedef {import('../types').RequestHandlersPayload} RequestHandlersPayload
 * @typedef {import('../types').RequestHandlerTree} RequestHandlerTree
 * @typedef {import('../types').RouteMatch} RouteMatch
 */
import { Url } from '@robinblomberg/url';

/**
 * Handles request handler storage and retrieval.
 */
export class Router {
  /** @type {RequestHandlerTree} */
  #routes = {
    children: {},
    methods: {},
    name: null
  };

  /**
   * Add a request handler.
   *
   * @param {Method} method
   * @param {string} url
   * @param {RequestHandlersPayload} handlers
   */
  add(method, url, ...handlers) {
    const directories = Url.splitPath(url);
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
   * @param {Method} method
   * @param {string} url
   * @return {RouteMatch}
   */
  find(method, url) {
    const directories = Url.splitPath(url);
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
