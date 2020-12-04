import { test } from '@robinblomberg/test';
import { runTests } from './test/index.test.js';

test('@robinblomberg/http-server', async() => {
  await runTests();
})();
