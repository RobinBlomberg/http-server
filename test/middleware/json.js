/**
 * @typedef {import('../../main').RequestHandler} RequestHandler
 */

/**
 * @return {RequestHandler}
 */
export const json = () => {
  /** @type {RequestHandler} */
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
