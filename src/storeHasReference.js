import isNill from 'lodash/isNil';
import has from 'lodash/has';

import isReference from './isReference';
import type { Store, Reference } from './typings';


export default function storehasReference(store :Store, reference :Reference) {
  if (isNill(store)) {
    throw new Error('"store" must be defined');
  }
  if (!isReference(reference)) {
    throw new Error('"reference" must be a valid reference');
  }

  return has(store, reference.path);
}
