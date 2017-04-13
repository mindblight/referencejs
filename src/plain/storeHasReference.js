// @flow
import isNill from 'lodash/isNil';
import has from 'lodash/has';

import isReference from './isReference';
import type { Store, Reference } from './typings';

/**
 * Test if {@link Reference} is set in {@link Store}.
 * @param  store
 * @param  reference
 * @return {Boolean}
 *
 * @example
 * import { storehasReference, createReference } from 'referencejs';
 *
 * const store = {
 *   foo: 5,
 * };
 *
 * const reference = createReference('foo');
 * const emptyRefrence = createReference('bar');
 *
 * storehasReference(store, foo) === true;
 * storehasReference(store, emptyRefrence) === false;
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
