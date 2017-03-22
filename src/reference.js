import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isNill from 'lodash/isNil';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep'

export function isPath(path) {
  return isArray(path) &&
    path.length > 0 &&
    path.every((pathPart) => {
      return isString(pathPart) && pathPart.length > 0;
    });
}

export function isReference(reference) {
    return !!reference && isPath(reference.path);
}

export function createReference(path) {
  if (!isPath(path)) {
    throw Error(`path" must be a non-empty array of strings. Received ${path}`);
  }

  return { path };
}

// TODO: Add support for immutable.js
export const EMPTY_REFERENCE = Symbol('empty reference');


export function resolveReference(store, reference, value) {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }
}
