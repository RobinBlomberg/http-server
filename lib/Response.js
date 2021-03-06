/**
 * @typedef {globalThis.NodeJS.ErrnoException} ErrnoException
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('http').ServerResponse} ServerResponse
 * @typedef {import('./types').Chunk} Chunk
 * @typedef {import('./types').Headers} Headers
 * @typedef {import('./types').StatusCode} StatusCode
 */

import * as Crypto from 'crypto';
import * as Fs from 'fs';
import { StatusMessages } from './statusMessages.js';

/**
 * A HTTP response wrapper.
 *
 * @since 0.1.0
 */
export class Response {
  /** @type {Headers} */
  #headers;

  /** @type {IncomingMessage} */
  #req;

  /** @type {ServerResponse} */
  #res;

  /**
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  constructor(req, res) {
    this.#headers = {};
    this.#req = req;
    this.#res = res;
    this.#res.statusCode = 200;
    this.#res.statusMessage = 'OK';
  }

  /**
   * @private
   * @param {Chunk | undefined} chunk
   * @param {boolean} isTimestampETag
   * @return {string}
   */
  _createStrongETag(chunk, isTimestampETag) {
    let data = '';

    data += this.#res.statusCode;
    data += ' ';
    data += this.#res.statusMessage;

    for (const name in this.#headers) {
      if (Object.prototype.hasOwnProperty.call(this.#headers, name)) {
        data += '\n';

        const value = this.#headers[name];

        if (Array.isArray(value)) {
          for (const item of value) {
            data += `${name}:${item}`;
          }
        } else if (value !== undefined) {
          data += `${name}:${value}`;
        }
      }
    }

    data += isTimestampETag ? '1' : '0';

    if (chunk) {
      data += '\n\n';
      data += chunk;
    }

    return `"${Crypto.createHash('sha1').update(data).digest('base64')}"`;
  }

  /**
   * @private
   * @param {ErrnoException} exception
   */
  _handleSendFileError(exception) {
    this.setStatus(exception.code === 'ENOENT' ? 400 : 500);
    this.#res.end();
  }

  /**
   * @private
   */
  _writeHeaders() {
    for (const name in this.#headers) {
      if (Object.prototype.hasOwnProperty.call(this.#headers, name)) {
        this.#res.setHeader(name, this.#headers[name]);
      }
    }
  }

  /**
   * Sends the response to the client.
   *
   * @since 0.1.0
   * @param {Chunk | undefined} [chunk]
   */
  end(chunk) {
    if (!this.#res.headersSent) {
      const eTag = this._createStrongETag(chunk, false);

      if (eTag === this.#req.headers['if-none-match']) {
        this.setStatus(304);
        this.#res.end();
        return;
      }

      this.setHeader('ETag', eTag);
      this._writeHeaders();
    }

    this.#res.end(chunk);
  }

  /**
   * Sends a file to the client.
   *
   * @since 0.1.0
   * @param {string} path
   */
  async sendFile(path) {
    /** @type {Fs.promises.FileHandle} */
    let fileHandle;

    /** @type {Fs.Stats} */
    let fileStats;

    try {
      fileHandle = await Fs.promises.open(path, 'r');
    } catch (exception) {
      this._handleSendFileError(exception);
      return;
    }

    try {
      fileStats = await fileHandle.stat();
    } catch (exception) {
      this._handleSendFileError(exception);
      fileHandle.close();
      return;
    }

    const eTag = this._createStrongETag(String(fileStats.mtimeMs), true);

    if (eTag === this.#req.headers['if-none-match']) {
      this.setStatus(304);
      this.#res.end();
      fileHandle.close();
      return;
    }

    const readStream = Fs.createReadStream('', {
      autoClose: false,
      fd: fileHandle.fd
    });

    readStream.on('data', (chunk) => {
      if (!this.#res.headersSent) {
        this.setHeader('ETag', eTag);
        this._writeHeaders();
      }

      this.write(chunk);
    });

    readStream.on('end', () => {
      this.#res.end();
      fileHandle.close();
    });

    readStream.on('error', (error) => {
      this._handleSendFileError(error);
      fileHandle.close();
    });
  }

  /**
   * Sets a single header.
   *
   * @since 0.1.0
   * @param {string} name
   * @param {number | string} value
   * @return {Response}
   */
  setHeader(name, value) {
    this.#headers[name] = value;

    return this;
  }

  /**
   * Assigns headers to the response.
   *
   * @since 0.1.0
   * @param {Headers} headers
   * @return {Response}
   */
  setHeaders(headers) {
    Object.assign(this.#headers, headers);

    return this;
  }

  /**
   * Sets the response HTTP status.
   *
   * @since 0.1.0
   * @param {StatusCode} statusCode
   * @param {string} [statusMessage]
   * @return {Response}
   */
  setStatus(statusCode, statusMessage) {
    this.#res.statusCode = statusCode;

    if (statusMessage) {
      this.#res.statusMessage = statusMessage ?? StatusMessages[statusCode];
    }

    return this;
  }

  /**
   * Sends a chunk to the client. Sends all cached headers if they have not been sent.
   *
   * @since 0.1.0
   * @param {Chunk | undefined} chunk
   * @return {Response}
   */
  write(chunk) {
    if (!this.#res.headersSent) {
      this._writeHeaders();
    }

    this.#res.write(chunk);

    return this;
  }
}
