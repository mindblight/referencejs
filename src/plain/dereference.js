// @flow
import isNil from 'lodash/isNil';
import get from 'lodash/get';

import isReference from './isReference';
import EmptyRefrence from '../EmptyReference';
import storeHasReference from './storeHasReference';
import type { Store, Reference } from './typings';

/**
 * retrieves a value at a reference from a store
 * @param  store
 * @param  reference
 * @return The value at `reference` or {@link EmptyRefrence} if value is not present
 * @example
 * import createReference from 'referencejs/plain/createReference';
 * import dereference from 'referencejs/plain/dereference';
 *
 * const user = {
 *  name: "john"
 * };
 * const userReference = createReference('auth', 'users', 'user_1');
 * const store = {
 *   auth: {
 *     users: {
 *       user_1: user
 *     }
 *   }
 * };
 * dereference(store, userReference) === user;
 */
export default function dereference(store :Store, reference :Reference) :any {
  if (isNil(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  if (storeHasReference(store, reference)) {
    return get(store, reference.path);
  }
  return EmptyRefrence;
}
