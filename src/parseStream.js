/**
 * @typedef {import('stream').Readable} Readable
 * @param {Readable} stream
 * @return {Promise<Buffer>}
 */
export const parseStream = (stream) => {
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
