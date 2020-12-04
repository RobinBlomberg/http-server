import { Client } from '@robinblomberg/http-client';
import * as s from '@robinblomberg/schema';
import { equal } from '@robinblomberg/test';
import { Server } from '../../index.js';
import { body, cors, json } from '../middleware/index.js';

const PATH = '/api/User';
const PORT = 3000;

export const testResponseProperties = async() => {
  const server = new Server(PORT);
  const client = new Client();
  const userSchema = s.object({
    name: s.string()
  });

  server.post(PATH, cors(), json(), body(userSchema), async(req) => {
    const data = await req.json();

    return {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  });

  const res = await client.post(`http://localhost:${PORT}${PATH}`, {
    body: JSON.stringify({
      name: 'Frank'
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
  const data = await res.json();

  equal(
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
};
