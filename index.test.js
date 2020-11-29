/**
 * @typedef {import('./types').RequestHandler} RequestHandler
 */

import * as Http from 'http';
import * as Assert from '@robinblomberg/assert';
import * as s from '@robinblomberg/schema';
import { Server } from './index.js';

process.on('unhandledRejection', (exception) => {
  throw exception;
});

const PORT = 3000;

const app = new Server();

app.listen(PORT);

/**
 * @return {import('./types').RequestHandler}
 */
const json = () => {
  /** @type {import('./src/HttpServer/index.types').RequestHandler} */
  return (req) => {
    if (req.get('Content-Type') !== 'application/json') {
      return {
        body: 'Header "Content-Type" must be "application/json".',
        status: 400
      };
    }

    return true;
  };
};

/**
 * @param {s.Schema} schema
 * @return {RequestHandler}
 */
const body = (schema) => {
  /** @type {RequestHandler} */
  return async(req) => {
    const schemaError = schema.validate(await req.json());

    if (schemaError) {
      return {
        body: schemaError.toString(),
        status: 400
      };
    }

    return true;
  };
};

/**
 * @return {RequestHandler}
 */
const cors = () => {
  /** @type {RequestHandler} */
  return (req) => {
    if (!req.has('X-Requested-With')) {
      return {
        body: 'Header "X-Request-With" must be sent.',
        status: 400
      };
    }

    return true;
  };
};

const userSchema = s.object({
  name: s.string()
});

app.post('/api/User', cors(), json(), body(userSchema), async(req) => {
  const data = await req.json();

  return {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
});

/**
 * @typedef {import('stream').Readable} Readable
 * @param {Readable} stream
 * @return {Promise<Buffer>}
 */
const readStream = (stream) => {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.allocUnsafe(0);

    stream.on('data', (chunk) => {
      buffer = buffer
        ? Buffer.concat([buffer, chunk])
        : chunk;
    });

    stream.on('end', () => {
      resolve(buffer);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
};

const req = Http.request(`http://localhost:${PORT}/api/User`, { method: 'POST' }, async(res) => {
  const buffer = await readStream(res);

  Assert.equal(
    {
      body: buffer.toString(),
      status: res.statusCode
    },
    {
      body: '{"name":"42"}',
      status: 200
    }
  );

  app.close();
});

req.setHeader('Content-Type', 'application/json');
req.setHeader('X-Requested-With', 'XMLHttpRequest');
req.write('{ "name": "42" }');
req.end();
