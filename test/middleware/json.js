/**
 * @return {import('../../src/types').RequestHandler}
 */
export const json = () => {
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
