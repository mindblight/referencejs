import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import isNill from 'lodash/isNil';

import isReference from './isReference';

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
