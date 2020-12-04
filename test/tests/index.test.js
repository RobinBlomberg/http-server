import { testResponseProperties } from './testResponseProperties.test.js';
import { testRouter } from './testRouter.test.js';

export const runTests = async() => {
  await testResponseProperties();
  await testRouter();
};
