/* eslint-disable
  strict,
  no-param-reassign
*/
import fs from 'fs';
import path from 'path';

import Ajv from 'ajv';
import errors from 'ajv-errors';
import keywords from 'ajv-keywords';

import ValidationError from './ValidationError';

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
});

errors(ajv);
keywords(ajv, ['instanceof', 'typeof']);

const validateOptions = (schema: any, options: any, name: string) => {
  if (typeof schema === 'string') {
    schema = fs.readFileSync(path.resolve(schema), 'utf8');
    schema = JSON.parse(schema);
  }

  if (!ajv.validate(schema, options)) {
    throw new ValidationError(ajv.errors || [], name);
  }

  return true;
};

export = validateOptions;
