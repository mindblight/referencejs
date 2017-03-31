// @flow
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isNill from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import set from 'lodash/set';
import get from 'lodash/get';
import has from 'lodash/has';
import cloneDeep from 'lodash/cloneDeep';
import mapValues from 'lodash/mapValues';


/* Types */
export type Path = string[];
export type Reference = {
  path :Path,
};
export type Store = { [key :string] :* };

/* Validation */
export function isPath(path :Path) :boolean {
  return isArray(path) &&
    path.length > 0 &&
    path.every((pathPart) => {
      return isString(pathPart) && pathPart.length > 0;
    });
}

export function isReference(reference :*) :boolean {
  return !!reference && isPath(reference.path);
}

/* Reference */
export function createReference(path :Path) {
  if (!isPath(path)) {
    throw Error(`path" must be a non-empty array of strings. Received ${path.join(', ')}`);
  }

  return { path };
}

export function resolveReference(store :Store, reference :Reference, value :*) {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  const newStore = cloneDeep(store);
  set(newStore, reference.path, value);
  return newStore;
}

export function isValueAtReference(store :Store, reference :Reference) :boolean {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  return has(store, reference.path);
}

/* Dereference */
export const EMPTY_REFERENCE = Symbol('empty reference');
export function dereference(store :Store, reference :Reference) :* {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  if (isValueAtReference(store, reference)) {
    return get(store, reference.path);
  }
  return EMPTY_REFERENCE;
}

export function smartDereference(store :Store, val :*) :* {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }

  if (isReference(val)) {
    return dereference(store, val);
  }
  else if(isArray(val)) {
    return val.map(value => smartDereference(store, value));
  }
  else if (isPlainObject(val)) {
    return mapValues(val, (value) => {
      return smartDereference(store, value);
    });
  }
  return val;
}
