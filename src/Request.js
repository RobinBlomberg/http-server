/**
 * @typedef {import('../types').Headers} Headers
 * @typedef {import('../types').Method} Method
 * @typedef {import('../types').Parameters} Parameters
 */

import * as Http from 'http';
import { parseStream } from './parseStream.js';

/**
 * A HTTP IncomingMessage wrapper.
 */
export class Request {
  /** @type {Buffer | undefined} */
  #buffer;

  /** @type {Http.IncomingMessage} */
  #incomingMessage;

  /** @type {*} */
  #json;

  /** @type {string | undefined} */
  #text;

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
    this.#incomingMessage = incomingMessage;
    this.headers = /** @type {Headers} */ (incomingMessage.headers);
    this.method = /** @type {Method} */ (incomingMessage.method);
    this.url = /** @type {string} */ (incomingMessage.url);
    this.parameters = parameters;
  }

  /**
   * Read the entire request body buffer and cache the result.
   *
   * @return {Promise<Buffer>}
   */
  async buffer() {
    if (this.#buffer === undefined) {
      this.#buffer = await parseStream(this.#incomingMessage);
    }

    return this.#buffer;
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

  /**
   * Read the request body, parse it as JSON, and cache the result.
   *
   * @template T
   * @return {Promise<T>}
   */
  async json() {
    if (this.#json === undefined) {
      const text = await this.text();
      return JSON.parse(text);
    }

    return this.#json;
  }

  /**
   * Read the request body, parse it as text, and cache the result.
   *
   * @return {Promise<string>}
   */
  async text() {
    if (this.#text === undefined) {
      const buffer = await this.buffer();
      this.#text = buffer.toString();
    }

    return this.#text;
  }
}
