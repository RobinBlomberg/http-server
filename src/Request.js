/**
 * @typedef {import('./types').Headers} Headers
 * @typedef {import('./types').Method} Method
 * @typedef {import('./types').Parameters} Parameters
 */

import * as Http from 'http';
import { Stream } from '@robinblomberg/stream';

/**
 * A HTTP IncomingMessage wrapper.
 */
export class Request extends Stream {
  /** @type {Headers} */
  headers;

  /** @type {Method} */
  method;

  /** @type {string} */
  url;

  /** @type {Parameters} */
  parameters;

  /**
   * @param {Http.IncomingMessage} incomingMessage The original Node.js HTTP request.
   * @param {Parameters} parameters The URL parameters, (e.g. "/User/:userId" -> { userId: "378" }).
   */
  constructor(incomingMessage, parameters) {
    super(incomingMessage);

    this.headers = /** @type {Headers} */ (incomingMessage.headers);
    this.method = /** @type {Method} */ (incomingMessage.method);
    this.url = /** @type {string} */ (incomingMessage.url);
    this.parameters = parameters;
  }

  /**
   * @param {string} name
   * @return {string | number | string[] | undefined}
   */
  get(name) {
    return this.headers[name.toLowerCase()];
  }

  /**
   * @param {string} name
   * @return {boolean}
   */
  has(name) {
    return this.headers[name.toLowerCase()] !== undefined;
  }
}
