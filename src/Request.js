/**
 * @typedef {import('./types').Headers} Headers
 * @typedef {import('./types').Method} Method
 * @typedef {import('./types').Parameters} Parameters
 */

import * as Http from 'http';
import { Stream } from '@robinblomberg/stream';

/**
 * A HTTP IncomingMessage wrapper.
 *
 * @since 0.1.0
 */
export class Request extends Stream {
  /**
   * @since 0.1.0
   * @type {Headers}
   */
  headers;

  /**
   * @since 0.1.0
   * @type {Method}
   */
  method;

  /**
   * @since 0.1.0
   * @type {string}
   */
  url;

  /**
   * @since 0.1.0
   * @type {Parameters}
   */
  parameters;

  /**
   * @param {Http.IncomingMessage} incomingMessage
   * @param {Parameters} parameters
   */
  constructor(incomingMessage, parameters) {
    super(incomingMessage);

    this.headers = /** @type {Headers} */ (incomingMessage.headers);
    this.method = /** @type {Method} */ (incomingMessage.method);
    this.url = /** @type {string} */ (incomingMessage.url);
    this.parameters = parameters;
  }

  /**
   * Gets a header.
   *
   * @since 0.1.0
   * @param {string} name
   * @return {string | number | string[] | undefined}
   */
  get(name) {
    return this.headers[name.toLowerCase()];
  }

  /**
   * Checks whether a specified header exists.
   *
   * @since 0.1.0
   * @param {string} name
   * @return {boolean}
   */
  has(name) {
    return this.headers[name.toLowerCase()] !== undefined;
  }
}
