// @flow
import isNill from 'lodash/isNil';
import has from 'lodash/has';

import isReference from './isReference';
import type { Store, Reference } from './typings';

/**
 * Test if a reference is set in a store.
 * @param  store
 * @param  reference
 * @return {Boolean}           false if {@link dereference} would return {@link EmptyRefrence}, otherwise true
 */
export default function storehasReference(store :Store, reference :Reference) {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  return has(store, reference.path);
}
