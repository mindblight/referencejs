// @flow
import isNil from 'lodash/isNil';

import isReference from './isReference';
import EmptyRefrence from '../EmptyReference';
import type { ImmutableStore, ImmutableReference } from './typings';

/**
 * retrieves a value at a reference from a store
 * @param  store
 * @param  reference
 * @return The value at `reference` or {@link EmptyRefrence} if value is not present
 *
 * @example
 * import { fromJS } from 'immutable';
 * import createReference from 'referencejs/immutable/createReference';
 * import dereference from 'referencejs/immutable/dereference';
 *
 * const user = fromJS({
 *  name: "john"
 * });
 * const userReference = createReference('auth', 'users', 'user_1');
 * const store = fromJS({
 *   auth: {
 *     users: {
 *       user_1: user
 *     }
 *   }
 * });
 * dereference(store, userReference) === user;
 */
export default function dereference(store :ImmutableStore, reference :ImmutableReference) :* {
  if (isNil(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  return store.getIn(reference.get('path'), EmptyRefrence);
}
