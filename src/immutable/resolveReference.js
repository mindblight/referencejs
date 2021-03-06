// @flow
import isNill from 'lodash/isNil';
import isInteger from 'lodash/isInteger';
import { Map, List } from 'immutable';

import isReference from './isReference';
import type { ImmutableStore, ImmutableReference, ImmutablePath, PathSegment } from './typings';

/**
 * Returns a new {@link ImmutableStore} with `value` at `reference`
 * @param  store
 * @param  reference      Reference where the value should be placed
 * @param  {any} value    The value to place in the store
 * @return                An {@link ImmutableStore} containing `value` at `reference`
 *
 * @example
 * import { Map } from 'immutable';
 * import { createReference, resolveReference, dereference } from 'referencejs/immutable';
 *
 * const user = Map({
 *  name: "john"
 * });
 * const userReference = createReference('auth', 'users', 'user_1');
 *
 * let store = Map();
 * store = resolveReference(store, userReference, user);
 * dereference(store, userReference) === user;
 */
export default function resolveReference(store :ImmutableStore, reference :ImmutableReference, value :*) :ImmutableStore {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  const path :ImmutablePath = reference.get('path');
  if (store.hasIn(path)) {
    return store.setIn(path, value);
  }

  const pathObject = path.reduceRight((objectForMerge, pathSegment :PathSegment) => {
    if (isInteger(pathSegment)) {
      return List().set((pathSegment :any), objectForMerge);
    }
    return Map({
      [pathSegment]: objectForMerge,
    });
  }, value);

  return store.mergeDeep(pathObject);
}
