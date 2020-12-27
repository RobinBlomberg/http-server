/**
 * @typedef {import('@robinblomberg/schema').Schema} Schema
 * @typedef {import('../../lib/types').RequestHandler} RequestHandler
 */

/**
 * @param {Schema} schema
 * @return {RequestHandler}
 */
export const body = (schema) => {
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
