/**
 * @typedef {import('../../lib/types').RequestHandler} RequestHandler
 */

/**
 * @return {RequestHandler}
 */
export const cors = () => {
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
