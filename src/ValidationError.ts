import { ErrorObject } from 'ajv';

/* eslint-disable
  strict,
  no-param-reassign
*/

export default class ValidationError extends Error {
  name: string;
  errors: ErrorObject[];
  constructor(errors: ErrorObject[], name: string) {
    super();

    this.name = 'ValidationError';

    this.message = `${name || ''} Invalid Options\n\n`;

    this.errors = errors.map((err) => {
      err.dataPath = err.dataPath.replace(/\//g, '.');

      return err;
    });

    this.errors.forEach((err) => {
      this.message += `options${err.dataPath} ${err.message}\n`;
    });

    Error.captureStackTrace(this, this.constructor);
  }
}
