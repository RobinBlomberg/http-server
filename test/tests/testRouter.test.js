import { Client } from '@robinblomberg/http-client';
import { equal } from '@robinblomberg/test';
import { Router, Server } from '../../index.js';

const PORT = 3000;

export const testRouter = async() => {
  const server = new Server(PORT);
  const userRouter = new Router();
  const client = new Client();

  userRouter.post('/Message', 'Hello world!');

  server.route('/api/User', userRouter);

  const res = await client.post(`http://localhost:${PORT}/api/User/Message`);
  const data = await res.text();

  equal(
    data,
    'Hello world!'
  );

  server.close();
};
