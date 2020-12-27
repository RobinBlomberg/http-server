import Chai from 'chai';
import { Client } from '@robinblomberg/http-client';
import * as s from '@robinblomberg/schema';
import { body, cors, json } from '../support/index.js';
import { Router } from './router.js';
import { Server } from './server.js';

describe('server', () => {
  it('should be able to respond to a HTTP request', async() => {
    const server = new Server(process.env.PORT);
    const userRouter = new Router();
    const client = new Client();

    userRouter.post('/Message', 'Hello world!');

    server.route('/api/User', userRouter);

    const res = await client.post(`http://localhost:${process.env.PORT}/api/User/Message`);
    const data = await res.text();

    Chai.assert.strictEqual(
      data,
      'Hello world!'
    );

    server.close();
  });

  it('should handle middleware', async() => {
    const server = new Server(process.env.PORT);
    const client = new Client();
    const userSchema = s.object({
      name: s.string()
    });

    server.post('/api/User', cors(), json(), body(userSchema), async(req) => {
      const data = await req.json();

      return {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    });

    const res = await client.post(`http://localhost:${process.env.PORT}/api/User`, {
      body: JSON.stringify({
        name: 'Frank'
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    const data = await res.json();

    Chai.assert.deepStrictEqual(
      {
        body: data,
        status: res.statusCode
      },
      {
        body: {
          name: 'Frank'
        },
        status: 200
      }
    );

    server.close();
  });

  it('should flatten the middleware payload', async() => {
    const server = new Server(process.env.PORT);
    const client = new Client();
    const userSchema = s.object({
      name: s.string()
    });

    server.use(cors(), [json(), [[[body(userSchema)]]]]);

    server.post('/api/User', async(req) => {
      const data = await req.json();

      return {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    });

    const res = await client.post(`http://localhost:${process.env.PORT}/api/User`, {
      body: JSON.stringify({
        name: 'Frank'
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    const data = await res.json();

    Chai.assert.deepStrictEqual(
      {
        body: data,
        status: res.statusCode
      },
      {
        body: {
          name: 'Frank'
        },
        status: 200
      }
    );

    server.close();
  });
});
