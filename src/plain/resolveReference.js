// @flow
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import isNill from 'lodash/isNil';

import isReference from './isReference';
import type { Store, Reference } from './typings';

/**
 * Returns a new {@link Store} with `value` at `reference`
 * @param  store
 * @param  reference      Reference where the value should be placed
 * @param  {any} value    The value to place in the store
 * @return                A new {@link Store} containing `value` at `reference`
 *
 * @example
 * import createReference from 'referencejs/plain/createReference';
 * import resolveReference from 'referencejs/plain/resolveReference';
 * import dereference from 'referencejs/plain/dereference';
 *
 * const user = {
 *  name: "john"
 * };
 * const userReference = createReference('auth', 'users', 'user_1');
 *
 * let store = {};
 * store = resolveReference(store, userReference, user);
 * dereference(store, userReference) === user;
 */
export default function resolveReference(store :Store, reference :Reference, value :*) :Store {
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
