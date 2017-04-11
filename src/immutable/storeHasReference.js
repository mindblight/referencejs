// @flow
import isNill from 'lodash/isNil';

import isReference from './isReference';
import type { ImmutableStore, ImmutableReference } from './typings';

/**
 * Test if {@link ImmutableReference} is set in {@link ImmutableStore}.
 * @param  store
 * @param  reference
 * @return {Boolean}
 *
 * @example
 * import { Map } from 'immutable';
 * import storehasReference from 'referencejs/immutable/storehasReference';
 * import createReference from 'referencejs/immutable/createReference';
 *
 * const store = Map({
 *   foo: 5,
 * });
 *
 * const reference = createReference('foo');
 * const emptyRefrence = createReference('bar');
 *
 * storehasReference(store, foo) === true;
 * storehasReference(store, emptyRefrence) === false;
 */
export default function storeHasReference(
  store :ImmutableStore,
  reference :ImmutableReference) :boolean {

  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  return store.hasIn(reference.get('path'));
}
