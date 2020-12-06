/**
 * @typedef {import('./lib/types').Chunk} Chunk
 * @typedef {import('./lib/types').Headers} Headers
 * @typedef {import('./lib/types').Method} Method
 * @typedef {import('./lib/types').Parameters} Parameters
 * @typedef {import('./lib/types').RequestHandlersPayload} RequestHandlersPayload
 * @typedef {import('./lib/types').RequestHandlerTree} RequestHandlerTree
 * @typedef {import('./lib/types').RequestHandler} RequestHandler
 * @typedef {import('./lib/types').Response} Response
 * @typedef {import('./lib/types').ResponseStatus} ResponseStatus
 * @typedef {import('./lib/types').RouteMatch} RouteMatch
 * @typedef {import('./lib/types').StatusCode} StatusCode
 */

/**
 * @template T
 * @typedef {import('./lib/types').Promiseable<T>} Promiseable<T>
 */

export { Router, Server } from './lib/index.js';
